const template = [
  {
    name: 'Location',
    children: [],
  },
  {
    name: 'Team',
    children: [{ name: 'Name', children: [] }],
  },
  {
    name: 'Player',
    isList: true,
    children: [
      { name: 'Name', children: [] },
      { name: 'Age', children: [] },
      {
        name: 'Address',
        isList: true,
        children: [
          { name: 'Local', children: [] },
          { name: 'Permanent', children: [] },
        ],
      },
    ],
  },
  {
    name: 'Fanclubs',
    isList: true,
    children: [],
  },
];
const serialInput = [
  {
    paramKey: 'Team.Fanclub[0]',
    paramValue: 'https://www.fcbarcelona.com/fans',
  },
  {
    paramKey: 'Team.Fanclub[1]',
    paramValue: 'https://www.fanclubbarcelona.nl/',
  },
  {
    paramKey: 'Team.Name',
    paramValue: 'Barcelona',
  },
  {
    paramKey: 'Team.Player[0].Name',
    paramValue: 'Neymar',
  },
  {
    paramKey: 'Team.Player[0].Age',
    paramValue: 28,
  },
  {
    paramKey: 'Team.Player[1].Name',
    paramValue: 'Lionel Messi',
  },
  {
    paramKey: 'Team.Player[1].Age',
    paramValue: 27,
  },
];
export { template, serialInput };
