import { Search, Mail, Phone, MessageCircle } from 'lucide-react'

export default function HelpSupportPage() {
    return (
        <div className="bg-white text-black items-center pt-28 min-h-screen lg:ml-64  gap-4 justify-center p-8 max-h-screen overflow-hidden h-screen" style={{ height: '500px', width: "83%" }} >
      




                <h2 className="text-2xl font-semibold text-blue-800 mb-4">How can we help you?</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for help..."
                        className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-blue-400" />
                </div>
     

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-blue-800 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <details key={index} className="bg-white rounded-lg shadow-md p-4">
                            <summary className="font-medium text-blue-700 cursor-pointer">{faq.question}</summary>
                            <p className="mt-2 text-gray-600">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </section>


        </div>



    )
}

const faqData = [
    {
        question: "How do I register for the gas booking service?",
        answer: "To register, click on the 'SignUp' button on the homepage and complete the form with your personal details."
    },
    {
        question: "How do I book a gas cylinder?",
        answer: "Log in to your account, go to the 'Book Now' section, select your preferred delivery date, and confirm your booking."
    },
    {
        question: "How do I know if my booking was successful?",
        answer: "You will receive a confirmation message on your screen and an email notification upon successful booking."
    },
    {
        question: "Is my payment information secure?",
        answer: "Yes, we use advanced encryption technologies to ensure your payment details are safe and secure."
    },
    {
        question: "How do I contact customer support?",
        answer: "You can reach us via the 'Contact Us' section, email, or call our helpline number available on the website."
    }
];
