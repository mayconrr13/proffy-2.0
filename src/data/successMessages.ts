interface Message {
  heading: string;
  message: string;
  button: {
    text: string;
    destinationPath: string;
  };
}

export const successMessages: Message[] = [
  {
    heading: 'Cadastro Concluído',
    message:
      'Agora você faz parte da plataforma da Proffy. Tenha uma ótima experiência.',
    button: {
      text: 'Fazer Log In',
      destinationPath: '/login',
    },
  },
  {
    heading: 'Redefinição enviada!',
    message:
      'Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.',
    button: {
      text: 'Voltar ao Log In',
      destinationPath: '/login',
    },
  },
  {
    heading: 'Cadastro salvo!',
    message:
      'Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu WhatsApp.',
    button: {
      text: 'Acessar lista',
      destinationPath: '/teachers-list',
    },
  },
];
