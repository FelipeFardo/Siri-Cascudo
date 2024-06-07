import { Metadata } from 'next'

import { SignInForm } from './credentials/sign-in-form'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-[350px] flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Siricascudo
            </h1>
            <p className="text-sm text-muted-foreground">Crie sua conta</p>
          </div>
        </div>
        <div>
          <SignInForm />
        </div>
        <p className="px-8 text-center text-sm leading-relaxed text-muted-foreground">
          Ao continuar você concorda com nossos termos{' '}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            Termos de Serviço
          </a>{' '}
          e{' '}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            Política de Privacidade
          </a>
          .
        </p>
      </div>
    </div>
  )
}
