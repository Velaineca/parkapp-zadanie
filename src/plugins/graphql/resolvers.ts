type Ctx = unknown

const USERS = [
    {id:"u1", email:"zadanie@test.pl", name:"Test User", password:"test123", gates:['Szlaban Grzybowska 1','Brama Garażowa 1','Brama Wyjazdowa Śląska','Szlaban Pomorska 32','Szlaban Łódzka 25','Brama Gdańska 15']},
    {id:"u2", email:"testowicz@test.pl", name:"Testowicz Testerski", password:"testowicz",gates:['Szlaban Wrocławska 7','Brama Szczecińska 42']},
    {id:"u3", email:"testowska@test.pl", name:"Testowska Testowiłówna", password:"123!",gates:['Brama Wyjazdowa Testowska','Szlaban Zielona 23','Brama Garażowa 1','Brama Garażowa 2']},
]

export default {
    Query:{
      me:(_:unknown,__:unknown, ctx:{userId?:string}) => {
          const user = USERS.find(user => user.id === ctx.userId) ?? USERS[0];
          return {id:user.id, email:user.email, name:user.name,gates:user.gates}
      }
    },
    Mutation:{
        login:(_: unknown, args: {email:string; password:string}, _ctx:Ctx) =>{
            const user = USERS.find(user => user.email === args.email)
            if(!args.email || !args.password)throw new Error("Type both email and password.")
            if(!user)throw new Error("User not found.")
            if(user.password !== args.password) throw new Error("Invalid password.")

          return{
              token:'mock-token-' + user.id,
              user:{id:user.id,email: user.email, name:user.name, gates:user.gates},
          }
        },
    }
}