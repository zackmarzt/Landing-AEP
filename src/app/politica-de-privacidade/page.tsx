import { Metadata } from 'next';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';

export const metadata: Metadata = {
    title: 'Política de Privacidade | AEP',
    description: 'Política de Privacidade da Associação de Educação Personalizada',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p className="text-muted-foreground mb-6">
                        Última atualização: {new Date().toLocaleDateString('pt-BR')}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            A Associação de Educação Personalizada (AEP) está comprometida em proteger a privacidade
                            e os dados pessoais de seus usuários. Esta Política de Privacidade descreve como coletamos,
                            usamos, armazenamos e protegemos suas informações pessoais.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Informações que Coletamos</h2>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                            Podemos coletar as seguintes informações:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Nome completo</li>
                            <li>Endereço de e-mail</li>
                            <li>Número de telefone</li>
                            <li>Informações fornecidas através de formulários de contato</li>
                            <li>Dados de navegação e cookies</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. Como Usamos suas Informações</h2>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                            Utilizamos suas informações para:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Responder às suas solicitações e perguntas</li>
                            <li>Fornecer informações sobre nossos serviços educacionais</li>
                            <li>Melhorar nosso site e serviços</li>
                            <li>Enviar comunicações relacionadas aos nossos programas</li>
                            <li>Cumprir obrigações legais</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Proteção de Dados</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger
                            suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
                            Seus dados são armazenados em servidores seguros e o acesso é restrito apenas a pessoal autorizado.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Compartilhamento de Informações</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros,
                            exceto quando necessário para fornecer nossos serviços ou quando exigido por lei.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                            Nosso site utiliza cookies para melhorar sua experiência de navegação. Cookies são pequenos
                            arquivos de texto armazenados em seu dispositivo que nos ajudam a entender como você usa nosso site.
                        </p>
                        <h3 className="text-xl font-semibold mb-2 mt-4">Tipos de Cookies Utilizados</h3>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-3">
                            <li><span className="font-semibold text-foreground">Cookies Essenciais:</span> Necessários para o funcionamento básico do site</li>
                            <li><span className="font-semibold text-foreground">Cookies de Preferência:</span> Armazenam suas preferências e configurações</li>
                        </ul>
                        <h3 className="text-xl font-semibold mb-2 mt-4">Gerenciamento de Cookies</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Você pode gerenciar suas preferências de cookies através do banner que aparece ao acessar nosso site
                            pela primeira vez. Você também pode configurar seu navegador para recusar cookies, mas isso pode
                            afetar a funcionalidade do site. Para limpar suas preferências de cookies, você pode limpar o
                            armazenamento local do seu navegador.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">7. Seus Direitos</h2>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                            De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Acessar seus dados pessoais</li>
                            <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                            <li>Solicitar a exclusão de seus dados</li>
                            <li>Revogar o consentimento para o uso de seus dados</li>
                            <li>Solicitar a portabilidade de seus dados</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">8. Retenção de Dados</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os
                            propósitos descritos nesta política ou conforme exigido por lei.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">9. Alterações nesta Política</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você
                            revise esta página regularmente para se manter informado sobre como estamos protegendo
                            suas informações.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">10. Contato</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus
                            dados pessoais, entre em contato conosco através do formulário de contato em nosso site ou pelo e-mail <span className="font-italic">cultura@aepbr.org.br</span>.
                        </p>
                    </section>
                </div>
            </div>
            <main />
            <Footer />
        </div>

    );
}
