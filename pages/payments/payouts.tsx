import Layout from "@/components/layout/layout";
import ConnectWrapper from "@/components/layout/connectWrapper";


export default function PayoutsPage() {
    return (
        <div>
            <Layout title="Payouts">
                <ConnectWrapper>
                    <h1>Payouts</h1>
                    <stripe-connect-payouts />
                </ConnectWrapper>
            </Layout>
        </div>
    )
}