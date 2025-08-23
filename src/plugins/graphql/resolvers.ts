type Ctx = unknown


const PILOTS = Array.from({ length: 12 }).map((_, i) => ({
    id: String(i + 1),
    name: `Gate ${i + 1}`,
    location: ['A', 'B', 'C'][i % 3],
    color: ['#2563eb', '#16a34a', '#f59e0b'][i % 3],
}))

export default {
    Query:{
        me:()=> ({id: 'u1', email:'zadanie@test.pl', name:'Test User'}),
        pilots: (_:unknown, args: {page:number; perPage:number}) => {
            const {page,perPage} = args
            const start = (page -1) * perPage
            const items = PILOTS.slice(start,start + perPage)
            const totalPages = Math.ceil(PILOTS.length / perPage)
            return {items, page, perPage, totalPages}
        },
    },

    Mutation:{
        login:(_: unknown, args: {email:string; password:string}, _ctx:Ctx) =>{
          return{
              token:'mock-token-01',
              user:{id:'u1',email: args.email, name:'Test User'},
          }
        },
    }
}