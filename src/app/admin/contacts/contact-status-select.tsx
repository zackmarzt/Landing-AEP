"use client"

import * as React from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { updateContactStatusAction } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function ContactStatusSelect({
    id,
    currentStatus,
}: {
    id: string
    currentStatus: string
}) {
    const [status, setStatus] = React.useState(currentStatus)
    const [isPending, startTransition] = React.useTransition()
    const { toast } = useToast()

    const handleStatusChange = (value: string) => {
        setStatus(value)
        startTransition(async () => {
            const result = await updateContactStatusAction(id, value)
            if (result.success) {
                toast({
                    title: "Status atualizado",
                    description: `O status do contato foi atualizado.`,
                })
            } else {
                toast({
                    title: "Erro ao atualizar status",
                    description: "Ocorreu um erro ao atualizar o status do contato.",
                    variant: "destructive",
                })
                // Ideally revert on failure, but for now just show error
                setStatus(currentStatus)
            }
        })
    }

    return (
        <Select
            value={status}
            onValueChange={handleStatusChange}
            disabled={isPending}
        >
            <SelectTrigger className="w-[130px]">
                <div className="flex items-center gap-2">
                    {isPending && <Loader2 className="h-3 w-3 animate-spin" />}
                    <SelectValue placeholder="Status" />
                </div>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Unread">Pendente</SelectItem>
                <SelectItem value="Read">Visto</SelectItem>
                {/* Keeping Replied just in case, though user asked for seen/pending */}
                <SelectItem value="Replied">Respondido</SelectItem>
            </SelectContent>
        </Select>
    )
}
