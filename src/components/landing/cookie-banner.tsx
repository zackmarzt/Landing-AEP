'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { getCookieConsent, setCookieConsent } from '@/lib/cookies';
import { Button } from '@/components/ui/button';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already given consent
        const consent = getCookieConsent();
        if (!consent) {
            // Show banner after a short delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        setCookieConsent('accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        setCookieConsent('declined');
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
            <div className="container mx-auto max-w-6xl">
                <div className="bg-card border border-border rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">🍪 Cookies</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Utilizamos cookies para melhorar sua experiência de navegação e analisar o tráfego do site.
                            Ao continuar navegando, você concorda com o uso de cookies.{' '}
                            <Link
                                href="/politica-de-privacidade"
                                className="text-primary hover:underline font-medium"
                            >
                                Saiba mais
                            </Link>
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDecline}
                            className="flex-1 md:flex-none"
                        >
                            Recusar
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleAccept}
                            className="flex-1 md:flex-none"
                        >
                            Aceitar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
