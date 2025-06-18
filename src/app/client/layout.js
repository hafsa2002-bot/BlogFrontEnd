import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ClientLayout({ children }) {
    return (
        <div className="bg-[#fcf8eff5] h-screen">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    )
}