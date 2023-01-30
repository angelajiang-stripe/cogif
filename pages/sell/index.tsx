import Layout from "@/components/layout/layout";
import CreateStore from "@/components/store/createStore";
import RetrieveStores from '@/components/store/retrieveStores'

export default function StorePage() {

    return (
        <Layout>
            <RetrieveStores />
        </Layout>
    )
}
