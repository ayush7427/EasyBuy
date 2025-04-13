import { Layout } from '../../components/index';
import { Clock, ReceiptTextIcon, ListChecks, XCircle, Banknote, Repeat, Phone } from 'lucide-react';
import myContext from '../../context/context';
import { useContext } from 'react'

const ReturnPolicy = () => {
    const context = useContext(myContext);
    const { mode } = context;

    const backgroundClass =
        mode === 'dark'
            ? 'bg-gray-800 text-white'
            : 'bg-gradient-to-br from-white via-blue-50 to-purple-50 text-gray-800';

    return (
        <Layout>
            <div className={`${backgroundClass} min-h-screen py-14 px-4 sm:px-10 transition-colors duration-300`}>
                <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 sm:p-12 space-y-12 transition-all duration-300">
                    {/* Header with Logo */}
                    <div className="flex justify-center items-center space-x-4 mb-8">
                        <ReceiptTextIcon size={48} className="text-blue-600" />
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            EasyBuy Return Policy
                        </h1>
                    </div>

                    <p className="text-center text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        At <span className="font-semibold text-blue-600 dark:text-blue-400">EasyBuy</span>, we are committed to providing a hassle-free return experience. If you're not completely satisfied with your purchase, here’s how we make returns easy.
                    </p>

                    {/* Policy Sections */}
                    <div className="space-y-10">

                        {/* Section 1: Return Window */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400 gap-2 mb-3">
                                <Clock size={22} />  Return Window
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                You have <span className="font-semibold">7 days</span> from the date of delivery to return most items.
                                Some items may have different return windows. Please check the product details page for more information.
                            </p>
                        </section>

                        {/* Section 2: Return Conditions */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400 gap-2 mb-3">
                                <ListChecks size={22} />  Conditions for Return
                            </h2>
                            <ul className="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300 space-y-1">
                                <li>Item must be unused and in original condition</li>
                                <li>Original packaging, tags, and invoice must be included</li>
                                <li>Electronics must have the original serial number intact</li>
                            </ul>
                        </section>

                        {/* Section 3: Non-returnable Items */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400 gap-2 mb-3">
                                <XCircle size={22} />  Non-returnable Items
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                The following items are non-returnable:
                            </p>
                            <ul className="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300 space-y-1">
                                <li>Perishable goods like food and beverages</li>
                                <li>Personal hygiene products</li>
                                <li>Gift cards, downloadable products, and digital items</li>
                            </ul>
                        </section>

                        {/* Section 4: Refund Process */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400 gap-2 mb-3">
                                <Banknote size={22} />  Refund Process
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                After we receive and inspect your returned item, a refund will be initiated within 2 business days. Refunds will be credited to your original payment method or as EasyBuy Wallet balance, as per your preference.
                            </p>
                        </section>

                        {/* Section 5: Exchange Policy */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400 gap-2 mb-3">
                                <Repeat size={22} />  Exchange Policy
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                We offer exchanges for damaged or defective products. If the item you received is damaged or defective, please reach out to us within 7 days of delivery for a replacement.
                            </p>
                        </section>

                        {/* Section 6: Contact Support */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400 gap-2 mb-3">
                                <Phone size={22} />  Need Assistance?
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                If you have any questions or need help with returns, please contact our support team at{' '}
                                <a href="mailto:support@easybuy.com" className="text-blue-500 hover:underline">
                                    support@easybuy.com
                                </a> or call us at <span className="font-semibold">1800-000-1234</span>.
                            </p>
                        </section>

                    </div>
                </div>
            </div>
        </Layout>
    );
};


export default ReturnPolicy