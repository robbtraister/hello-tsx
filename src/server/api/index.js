'use strict'

// const { graphql, buildSchema } = require('graphql')

export const guidance = user => ({
  retirementSavings: [50000, 55000, 60000, 80000, 120000, 150000, 200000]
})

export const profile = user => ({
  name: user ? user.name : 'User',
  address: '123 Fake St'
})

export const score = user => ({
  value: 84,
  sections: [
    {
      title: 'Spend Less Than You Earn',
      value: 5,
      total: 10
    },
    {
      title: 'Emergency Savings',
      value: 8,
      total: 12
    },
    {
      title: 'Credit Card Balance',
      value: 3,
      total: 7
    }
  ]
})

export const txs = user => [
  {
    account: 'WF',
    title: 'mortgage',
    amount: -2500
  }
]

// const schema = buildSchema(`
// type Guidance {
//   retirementSavings: [Float]
// }

// type Profile {
//   name: String
//   address: String
// }

// type Section {
//   title: String
//   value: Int
//   total: Int
// }

// type Score {
//   value: Int
//   sections: [Section]
// }

// type Tx {
//   account: String
//   title: String
//   amount: Float
// }

// type Query {
//   guidance: Guidance
//   profile: Profile
//   score: Score
//   txs: [Tx]
// }
// `)

// graphql(
//   schema,
//   '{ profile { name address } }',
//   {
//     guidance,
//     profile,
//     score,
//     txs
//   }
// )
//   .then(({ data }) => { console.log(data) })
//   .catch(err => { console.error(err) })
