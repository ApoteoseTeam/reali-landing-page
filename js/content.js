export const institution = {
  INSTITUTION_REGISTRATION_URL: '',
  CANONICAL_URL: '',
  email: '',
  privacyUrl: '',
  termsUrl: '',
  // Cada rede recebe { label, url }. Ex.: Instagram, LinkedIn, GitHub ou YouTube.
  socials: [],
};

export const team = [
  // Cada perfil recebe { name, role, bio, responsibilities: [], photo, linkedin, github }.
];

export const history = [
  [
    'Identificação do problema',
    'A equipe investigou como a tecnologia poderia contribuir para enfrentar desafios do planejamento e do desperdício alimentar na escola.',
  ],
  [
    'Pesquisa e idealização',
    'Estudo do problema, identificação dos públicos e discussão das soluções possíveis.',
  ],
  ['Planejamento da solução', 'Definição da arquitetura, das tecnologias e das experiências de uso.'],
  ['Desenvolvimento técnico', 'Criação de componentes da plataforma e experimentos com visão computacional.'],
  ['Testes e evolução', 'Validação técnica, ajustes de desempenho e refinamento da experiência.'],
  ['Próximos passos', 'Integração dos módulos, validação em ambientes autorizados e evolução do produto.'],
].map(([title, text]) => ({ title, text, date: '', photo: '', photoAlt: '' }));

export const steps = [
  [
    'scan',
    'Entrada dos estudantes',
    'Na portaria, a visão computacional auxilia a contagem de entradas para entender o fluxo de estudantes. A proposta usa contagem anônima, sem reconhecimento facial ou biometria.',
    'Portaria',
    'Fluxo de entradas',
  ],
  [
    'plate',
    'Refeições servidas',
    'Na cantina, uma câmera auxilia a contagem de pratos para acompanhar o volume de refeições distribuídas.',
    'Cantina',
    'Pratos servidos',
  ],
  [
    'chart',
    'Indicadores e dashboards',
    'Os registros são organizados em indicadores da operação alimentar. Gestores autorizados podem acompanhá-los conforme seu nível de acesso.',
    'Painel de alimentação',
    'Entradas · Refeições · Histórico',
  ],
  [
    'spark',
    'Inteligência para decisões',
    'A RealInova pode ajudar a interpretar indicadores, identificar padrões de demanda e apoiar o planejamento, respeitando as permissões de cada perfil.',
    'RealInova',
    'Como variou a demanda por refeições?',
  ],
];

export const roles = [
  [
    'chart',
    'Diretores e gestores',
    'Indicadores da instituição, acompanhamento da operação e relatórios para orientar decisões.',
  ],
  [
    'leaf',
    'Nutricionistas',
    'Informações que ajudam a acompanhar a demanda e planejar a alimentação escolar.',
  ],
  [
    'plate',
    'Merendeiras',
    'Registros de refeições e informações da rotina, conforme os módulos disponibilizados.',
  ],
  ['school', 'Secretarias de Educação', 'Visão agregada dos indicadores das escolas vinculadas à rede.'],
];

export const benefits = [
  ['leaf', 'Apoio à redução do desperdício', 'Ajustar o preparo à demanda ajuda a usar melhor os alimentos.'],
  ['plate', 'Visibilidade sobre a demanda', 'Acompanhe o volume de refeições distribuídas ao longo do dia.'],
  ['book', 'Registros organizados', 'Reúna informações operacionais em um só lugar.'],
  ['chart', 'Planejamento com histórico', 'Use registros anteriores para preparar os próximos dias.'],
  [
    'scan',
    'Acompanhamento por indicadores',
    'Observe entradas e refeições para interpretar mudanças na rotina.',
  ],
  ['school', 'Visão de diferentes unidades', 'Acompanhe escolas vinculadas de acordo com as permissões.'],
  ['shield', 'Uso responsável de recursos', 'Considere a demanda observada ao planejar o preparo.'],
  ['spark', 'Tecnologia na rotina escolar', 'Conecte a alimentação, a gestão e a sustentabilidade.'],
];

export const stack = [
  ['Backend', 'Python · Django · Django REST Framework · PostgreSQL'],
  ['Frontend e experiência', 'React Native · Expo · Interfaces de gestão e dashboards'],
  ['Visão computacional', 'YOLO · OpenCV · ONNX Runtime · Rastreamento e contagem de objetos'],
  ['Inteligência artificial', 'Agno · Modelos de linguagem integráveis · RealInova'],
  ['Arquitetura', 'APIs REST · Controle de acesso · Estrutura multi-instituição · Integrações de captura'],
];

export const questions = [
  [
    'O que é o Reali?',
    'É uma solução tecnológica que utiliza dados e indicadores para apoiar a gestão da alimentação escolar.',
  ],
  [
    'Como a visão computacional funciona?',
    'A tecnologia interpreta imagens das câmeras para auxiliar na contagem de entradas de estudantes e de pratos servidos.',
  ],
  [
    'O Reali identifica individualmente os alunos?',
    'A proposta atual utiliza contagem anônima, sem reconhecimento facial.',
  ],
  [
    'Quem pode utilizar a plataforma?',
    'Instituições autorizadas e usuários convidados conforme suas funções e permissões.',
  ],
  [
    'Como cadastrar uma instituição?',
    'O pedido é feito pelo portal externo de solicitação de cadastro e passa por avaliação da equipe Reali.',
  ],
  [
    'O Reali já está disponível para todas as escolas?',
    'A disponibilidade depende do estágio de validação e das etapas de implantação em cada instituição.',
  ],
  [
    'A plataforma pode ser utilizada por redes de ensino?',
    'A arquitetura foi concebida para organizações que gerenciam uma ou mais unidades escolares.',
  ],
];

export const prompts = [
  [
    'Como está a movimentação de refeições nesta semana?',
    'Posso analisar os registros disponíveis e organizar uma visão dos indicadores da semana.',
    '1.040 refeições na semana',
  ],
  [
    'Quantos pratos foram servidos hoje?',
    'Neste painel de exemplo, o total de hoje é de 218 pratos.',
    '218 refeições hoje',
  ],
  [
    'Como a demanda variou nos últimos dias?',
    'No exemplo, o maior volume foi na quarta-feira. Na quinta, o total ficou abaixo do registrado no dia anterior.',
    '226 refeições na quarta',
  ],
  [
    'Quais tendências aparecem nos indicadores?',
    'Na amostra, o volume de refeições ficou acima de 200 em quatro dos cinco dias exibidos.',
    '4 dias acima de 200 refeições',
  ],
  [
    'O que pode ajudar no planejamento?',
    'Compare o histórico de refeições por dia da semana com as entradas e considere mudanças na rotina da escola.',
    'Histórico de entradas e refeições',
  ],
];

export const periods = [
  { entry: 286, meals: 218, labels: ['8h', '9h', '10h', '11h', '12h'], values: [0, 0, 14, 81, 123] },
  {
    entry: 1394,
    meals: 1040,
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    values: [193, 202, 226, 201, 218],
  },
];
