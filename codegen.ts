import {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite:true,
    schema:'src/plugins/graphql/schema.graphql',
    documents:['src/**/*.{vue,ts,graphql}'],
    generates:{
        'src/plugins/gql/':{
            preset:'client',
            plugins:[],
            config:{
                useTypeImports:true
            }
        }
    }
}

export default config