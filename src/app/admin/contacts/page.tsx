import { getContacts } from "@/app/actions";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

import { ContactStatusSelect } from "./contact-status-select";

export default async function ContactsPage() {
    const contacts = await getContacts();


    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Contatos Recebidos</h1>
            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Assunto</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    Nenhum contato recebido.
                                </TableCell>
                            </TableRow>
                        ) : (
                            contacts.map((contact) => (
                                <TableRow key={contact.id}>
                                    <TableCell>
                                        {contact.createdAt
                                            ? format(new Date(contact.createdAt), "dd/MM/yyyy HH:mm", {
                                                locale: ptBR,
                                            })
                                            : "-"}
                                    </TableCell>
                                    <TableCell>{contact.name}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.subject || "-"}</TableCell>
                                    <TableCell>
                                        <ContactStatusSelect id={contact.id} currentStatus={contact.status || "Unread"} />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Ver
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Detalhes do Contato</DialogTitle>
                                                    <DialogDescription>
                                                        Enviado em {contact.createdAt ? format(new Date(contact.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR }) : "-"}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold text-right">Nome:</span>
                                                        <span className="col-span-3">{contact.name}</span>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold text-right">Email:</span>
                                                        <span className="col-span-3">{contact.email}</span>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold text-right">Telefone:</span>
                                                        <span className="col-span-3">{contact.phone || "-"}</span>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold text-right">Assunto:</span>
                                                        <span className="col-span-3">{contact.subject || "-"}</span>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-start gap-4">
                                                        <span className="font-bold text-right mt-1">Mensagem:</span>
                                                        <div className="col-span-3 max-h-[200px] overflow-y-auto p-2 bg-muted rounded-md text-sm whitespace-pre-wrap">
                                                            {contact.message}
                                                        </div>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

