import Layout from "@/components/layout/layout"
import "@/components/wrappers/connectWrapper"
import ConnectWrapper from "@/components/wrappers/connectWrapper"

export default function PaymentsPage(){
    return(
        <div>
            <Layout title="Payments">
                <ConnectWrapper>
                    <h1>Payments Dashboard</h1>
                    <stripe-connect-payments/>
                </ConnectWrapper>
            </Layout>
        </div>
    )
}
