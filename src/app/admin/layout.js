import AdminNav from "@/components/AdminNav";

export default function AdminRoot({children}){
    return(
        <html>
            <body  >
                <AdminNav />
                <main>{children}</main>
            </body>
        </html>
    )
}