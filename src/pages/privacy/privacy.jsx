import React from 'react';
import { Layout } from '../../components/index';
import { ShieldCheck, LockKeyhole, Mail, Info, User, Settings2, FileWarning } from 'lucide-react';
import myContext from '../../context/context';
import { useContext } from 'react'

const PrivacyPolicy = () => {
    const context = useContext(myContext)
    const { toggleMode, mode } = context

    // Apply conditional background class based on mode
    const backgroundClass =
        mode === 'dark'
            ? 'bg-gray-800 text-white'
            : 'bg-gradient-to-br from-white via-blue-50 to-purple-50 text-gray-800'

    return (
        <Layout>
            <div className={`${backgroundClass} min-h-screen py-14 px-4 sm:px-10 transition-colors duration-300`}>
                <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 sm:p-12 space-y-12 transition-all duration-300">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            🛡️ Privacy Policy
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            At <span className="font-semibold text-blue-600 dark:text-blue-400">EasyBuy</span>, we’re committed to protecting your personal data.
                            Here's everything you need to know about how we collect, use, and protect your information.
                        </p>
                    </div>

                    {/* Section List */}
                    <div className="space-y-10">
                        {/* Section 1 */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400 gap-2 mb-3">
                                <User size={22} />  Information We Collect
                            </h2>
                            <ul className="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300 space-y-1">
                                <li>Name, email, phone, and shipping address</li>
                                <li>Payment information for transactions</li>
                                <li>Order history, browsing preferences, and feedback</li>
                            </ul>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400 gap-2 mb-3">
                                <Settings2 size={22} />  How We Use Your Information
                            </h2>
                            <ul className="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300 space-y-1">
                                <li>To process and deliver orders</li>
                                <li>To personalize your shopping experience</li>
                                <li>To improve our services and offerings</li>
                                <li>To send you offers (if opted-in)</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400 gap-2 mb-3">
                                <ShieldCheck size={22} />  Sharing of Information
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                We never sell or rent your data. Information is shared only with trusted service partners, and always under strict confidentiality agreements.
                            </p>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400 gap-2 mb-3">
                                <LockKeyhole size={22} />  Data Security
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                Your data is protected using secure servers, encryption protocols, and regular audits to prevent unauthorized access or misuse.
                            </p>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400 gap-2 mb-3">
                                <Info size={22} />  Your Choices
                            </h2>
                            <ul className="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300 space-y-1">
                                <li>Edit or delete your profile information at any time</li>
                                <li>Opt-out of promotional emails and alerts</li>
                            </ul>
                        </section>

                        {/* Section 6 */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400 gap-2 mb-3">
                                <FileWarning size={22} />  Policy Updates
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                We may update our privacy policy occasionally. Any changes will be reflected on this page or sent via email notifications.
                            </p>
                        </section>

                        {/* Section 7 */}
                        <section>
                            <h2 className="flex items-center text-2xl font-bold text-blue-600 dark:text-blue-400 gap-2 mb-3">
                                <Mail size={22} />  Contact Us
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                Have questions? Reach out to us at{' '}
                                <a href="mailto:support@easybuy.com" className="text-blue-500 hover:underline">
                                    support@easybuy.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
};




export default PrivacyPolicy;
