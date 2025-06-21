import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ClientLayout({ children }) {
    return (
        <div className="bg-[#fcf8eff5] pt-24 pb-96">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    )
}