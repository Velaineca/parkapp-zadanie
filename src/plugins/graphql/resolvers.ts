type Ctx = unknown

const USERS = [
    {id:"u1", email:"zadanie@test.pl", name:"Test User", password:"test123"},
    {id:"u2", email:"testowicz@test.pl", name:"Testowicz Testerski", password:"testowicz"},
    {id:"u3", email:"testowska@test.pl", name:"Testowska Testowiłówna", password:"123!"},
]

export default {
    Mutation:{
        login:(_: unknown, args: {email:string; password:string}, _ctx:Ctx) =>{
            const user = USERS.find(user => user.email === args.email)
            if(!args.email || !args.password)throw new Error("Type both email and password.")
            if(!user)throw new Error("User not found.")
            if(user.password !== args.password) throw new Error("Invalid password.")

          return{
              token:'mock-token-' + user.id,
              user:{id:user.id,email: user.email, name:user.name},
          }
        },
    }
}