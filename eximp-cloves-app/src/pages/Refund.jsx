import React, { useEffect } from 'react';
import Reveal from '../components/Reveal';
import '../styles/privacy.css';

const Refund = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="privacy-page">
            <section className="privacy-hero">
                <div className="container">
                    <Reveal>
                        <h1>Refund Policy</h1>
                        <p className="subtitle">Last Updated: February 18, 2024</p>
                    </Reveal>
                </div>
            </section>

            <section className="privacy-content">
                <div className="container narrow-container">
                    <Reveal delay={0.2}>
                        <div className="legal-document">

                            {/* Preamble */}
                            <p className="intro">
                                This Refund Policy ("Policy") sets out the terms and conditions under which Eximp and
                                Cloves Infrastructure Ltd ("the Company") shall process refunds to its clients and users in
                                connection with real estate services, property transactions, and related fees.
                            </p>

                            <p>
                                <strong>THE COMPANY DOES NOT OPERATE A NO-REFUND POLICY</strong> but rather
                                recognizes and upholds the right of consumers to seek refunds. The company shall, in
                                accordance with applicable Nigerian law, process all refund requests in a fair and reasonable
                                manner to all parties involved.
                            </p>

                            <p>
                                The rights of the consumer, including the right to refunds and the return of goods or
                                reversal of services, are expressly preserved under this Policy, subject to the applicable law
                                and the Company's right to charge reasonable and fair cancellation fees, and deduct applicable
                                fees in respect of any such refund or cancellation.
                            </p>

                            <p>
                                This Policy forms an integral part of the Company's terms of service and general policies
                                and should be read in conjunction therewith.
                            </p>

                            {/* Guiding Principles */}
                            <div className="policy-section">
                                <h3>Guiding Principles of This Refund Policy</h3>
                                <p>
                                    The Company shall at all times enforce the right to refunds under applicable Nigerian law.
                                    In doing so, the Company shall act fairly and reasonably towards all parties involved and
                                    reserves its lawful right to charge cancellation fees and make other deductibles in respect
                                    of any particular transaction where a refund or cancellation is requested by the Client.
                                </p>
                                <p>
                                    This Refund Policy, and all cancellation charges levied hereunder shall be construed,
                                    assessed, and enforced after considering the following factors:
                                </p>
                                <ul>
                                    <li>
                                        The nature of the particular property transaction that was initiated by the Client, including
                                        the type of property, the complexity of the transaction, the stage of completion, and the
                                        resources committed by the Company.
                                    </li>
                                    <li>
                                        The length of notice of the cancellation provided by the consumer to the Company, with
                                        earlier notice attracting more favorable refund terms and shorter notice attracting higher
                                        cancellation charges to reflect the Company's reduced ability to mitigate its losses.
                                    </li>
                                    <li>
                                        The Company's reasonable potential to find an alternative consumer or buyer for the
                                        property between the time of receiving the cancellation notice and the time of the
                                        cancelled transaction, taking into account prevailing market conditions, demand for the
                                        specific property, and the timeframe available to the Company.
                                    </li>
                                    <li>
                                        The general practice of the estate and property development industry, including established
                                        norms and standards in the Nigerian real estate sector for cancellation charges, refund
                                        processing, and the treatment of deposits and instalment payments for properties.
                                    </li>
                                </ul>
                                <p>
                                    The above factors shall guide the Company in determining the fairness and reasonableness
                                    of all cancellation fees and deductions applied under this Policy. Where any dispute arises
                                    as to the reasonableness of any cancellation charge, the Company shall demonstrate that the
                                    charge was assessed with due regard to the above factors.
                                </p>
                            </div>

                            {/* Definitions */}
                            <div className="policy-section">
                                <h3>Definitions</h3>
                                <p>
                                    In this Refund Policy, the following terms shall have the meanings set out below, unless
                                    the context otherwise requires:
                                </p>
                                <p>
                                    <strong>"Client"</strong> means any individual or entity that has entered into a service
                                    agreement with the Company or made any payment to the Company in connection with real
                                    estate services.
                                </p>
                                <p>
                                    <strong>"Deposit"</strong> means any initial, partial, or preliminary payment made by a
                                    Client towards the acquisition, lease, rental, or reservation of a property, including but
                                    not limited to earnest money, reservation fees, commitment fees, and any instalment
                                    payment that does not constitute full and final payment for the property or service. For
                                    the avoidance of doubt, all Deposits are strictly non-refundable.
                                </p>
                                <p>
                                    <strong>"Full Payment"</strong> means the total and complete payment of all sums due from
                                    a Client to the Company in respect of a property or service, being the aggregate of all
                                    Deposits, instalments, and final balances paid, such that no further payment remains
                                    outstanding. Full Payment is deemed to have been made on the date the last Deposit or
                                    instalment is received and confirmed by the Company.
                                </p>
                                <p>
                                    <strong>"Service Fee"</strong> means any fee, charge, commission, or payment made by a
                                    Client to the Company for the provision of real estate services, including but not limited
                                    to agency fees, consultation fees, inspection fees, documentation fees, legal processing
                                    fees, and administrative charges.
                                </p>
                                <p>
                                    <strong>"Property Transaction"</strong> means any transaction involving the sale, purchase,
                                    lease, rental, management, or development of real property facilitated by the Company.
                                </p>
                                <p>
                                    <strong>"Refund Request"</strong> means a formal written request submitted by a Client to
                                    the Company seeking a full or partial refund of Service Fees paid.
                                </p>
                            </div>

                            {/* Scope */}
                            <div className="policy-section">
                                <h3>Scope of This Policy</h3>
                                <p>
                                    This Refund Policy applies to all payments made to the Company in respect of real estate
                                    services rendered or to be rendered through the Company's website, offices, or authorized
                                    representatives.
                                </p>
                                <p>
                                    This Policy does not apply to payments made directly to third parties, including property
                                    owners, government agencies, or independent contractors, even where such payments were
                                    facilitated or recommended by the Company.
                                </p>
                                <p>
                                    Refund eligibility under this Policy is determined by the Client's payment stage at the
                                    time of the refund request. Clients who are within their active payment timeline (i.e.,
                                    still making instalment payments towards a property or service) may be eligible for a
                                    partial refund, subject to the cancellation fee framework and other deductions set out in
                                    this Policy. Clients who have defaulted on their payment obligations after the agreed
                                    instalment deadline may be eligible for a reduced partial refund. Once a Client has
                                    completed one hundred percent (100%) payment for a property or service, the transaction
                                    shall be deemed final and binding, and no refund shall be issued under any circumstances,
                                    save for the sole exception relating to the Company's failure to deliver a property after
                                    Full Payment as provided herein.
                                </p>
                                <p>
                                    The refund eligibility period for any claim under this Policy shall commence from the date
                                    the Client submits a valid Refund Request within the applicable payment timeline.
                                </p>
                            </div>

                            {/* Circumstances where refunds may be granted */}
                            <div className="policy-section">
                                <h3>Circumstances in Which Refunds May Be Granted</h3>
                                <p>
                                    The Company may, at its discretion, grant either a full or partial refund (as the case may
                                    be), subject to the cancellation fee framework and deductions set out in this Policy, in
                                    the following circumstances:
                                </p>
                                <h4>Duplicate Payments</h4>
                                <p>
                                    Where a Client has made more than one payment for the same service or transaction due to
                                    a system error, bank processing error, or administrative oversight, the Company shall
                                    refund the duplicate amount in full upon verification.
                                </p>
                                <h4>Non-Delivery of Service</h4>
                                <p>
                                    Where the Company has received payment for a service but has failed to deliver the agreed
                                    service within the timeframe specified in the service agreement, or within a reasonable
                                    period where no timeframe was specified, the Client may be entitled to a refund of the
                                    Service Fee paid for the undelivered service, subject to applicable service deductions set
                                    out in this Policy.
                                </p>
                                <h4>Material Misrepresentation</h4>
                                <p>
                                    Where the Company has made a material misrepresentation regarding a property listing,
                                    service, or transaction that directly induced the Client to make a payment, and such
                                    misrepresentation is attributable solely to the Company and not to a third party, the
                                    Client may be entitled to a partial refund, subject to the applicable cancellation fee
                                    tier and deductions set out in this Policy.
                                </p>
                                <h4>Cancellation by the Company</h4>
                                <p>
                                    Where the Company cancels or discontinues a service or Property Transaction for reasons
                                    within its control and not attributable to the Client's default, the Client shall be
                                    entitled to a refund of all sums paid in respect of the cancelled service, less only the
                                    applicable deductions for site inspection and logistics fees and other deductibles actually
                                    incurred. For the avoidance of doubt, the cancellation fee tiers set out in this Policy
                                    shall not apply where the cancellation is initiated by the Company.
                                </p>
                                <h4>Mutual Agreement</h4>
                                <p>
                                    Where both the Company and the Client mutually agree in writing to cancel a service or
                                    transaction, a refund may be granted on such terms as the parties may agree, subject to
                                    the cancellation fee framework and deductions set out in this Policy or as otherwise
                                    negotiated between the parties.
                                </p>
                                <h4>Failure to Deliver Property After Full Payment</h4>
                                <p>
                                    Where the Company has received Full Payment from a Client for a property and fails to
                                    deliver, transfer, or make available the property to the Client within the timeframe
                                    specified in agreement, the Client shall first serve a formal written notice of demand on
                                    the Company (the "Notice of Demand"), clearly stating the Client's intention to claim a
                                    refund and giving the Company fourteen (14) business days from receipt of the Notice of
                                    Demand to deliver the property or remedy the default.
                                </p>
                                <p>
                                    If the Company fails to deliver the property or remedy the default within the fourteen (14)
                                    business day cure period, the Client shall be entitled to a full refund of all sums paid
                                    (including all Deposits and instalment payments previously made), without interest and
                                    without application of the cancellation fee tiers. The Company shall process such refund
                                    within thirty (30) business days of the expiration of the fourteen (14) business day cure
                                    period.
                                </p>
                                <p>
                                    The Notice of Demand must be delivered in writing to the Company's registered office or
                                    via email to the Company's designated email address. This right to a full refund shall
                                    constitute the sole exception to the rule that completed transactions are final and
                                    non-refundable, and shall only apply where the failure to deliver is attributable to the
                                    Company's default and not to any act, omission, or default of the Client, a third party,
                                    or a force majeure event.
                                </p>
                            </div>

                            {/* Circumstances where refunds shall NOT be granted */}
                            <div className="policy-section">
                                <h3>Circumstances in Which Refunds Shall Not Be Granted</h3>
                                <p>The Company shall not be obligated to grant a refund in the following circumstances:</p>
                                <ul>
                                    <li>
                                        Where the Client has voluntarily cancelled a Property Transaction or service after the
                                        Company has commenced performance of its obligations, unless the cancellation falls
                                        within the cooling-off period specified below.
                                    </li>
                                    <li>
                                        Where the service has been fully performed and delivered by the Company in accordance
                                        with the terms of the service agreement.
                                    </li>
                                    <li>
                                        Where the Client's dissatisfaction arises from market conditions, property depreciation,
                                        impatience, changes in government policy, or other factors beyond the Company's
                                        reasonable control.
                                    </li>
                                    <li>
                                        Where the Client has provided false, misleading, or incomplete information that
                                        materially affected the service or transaction.
                                    </li>
                                    <li>
                                        Where the refund request is made after the expiration of the refund request period
                                        specified in this Policy.
                                    </li>
                                    <li>
                                        Where fees paid relate to third-party services, government levies, statutory charges,
                                        stamp duties, or registration fees, which are non-refundable once remitted to the
                                        relevant authority or third party.
                                    </li>
                                    <li>
                                        Where the Client has breached any term of the contract agreement or these Terms of
                                        Service.
                                    </li>
                                    <li>
                                        Once a Client has completed one hundred per cent (100%) payment for a property or
                                        service, the transaction shall be considered final and binding, and no refund shall be
                                        issued under any circumstances, save for the sole exception relating to the Company's
                                        failure to deliver a property after Full Payment as provided in this Policy.
                                    </li>
                                </ul>
                            </div>

                            {/* Company's Rights Upon Client Payment Default */}
                            <div className="policy-section">
                                <h3>Company's Rights Upon Client Payment Default</h3>
                                <p>
                                    Where a Client defaults in the payment of instalments in accordance with the agreed
                                    payment schedule, the Company's rights under this Policy and under the applicable service
                                    or subscription agreement shall be fully preserved. In particular, the Company reserves
                                    the absolute and unfettered right, exercisable at its sole discretion and without recourse
                                    to the defaulting Client, to take any one or more of the following actions:
                                </p>
                                <h4>Rescission of Contract</h4>
                                <p>
                                    The Company may rescind and terminate the contract entered into with the defaulting Client
                                    in respect of the relevant property transaction. Upon rescission, the Company shall refund
                                    to the Client fifty percent (50%) of the total amount paid by the Client as at the date of
                                    default, less all applicable deductions including the cancellation fee, legal fees, site
                                    inspection and logistics fees, and other deductibles as set out in the Deductions from
                                    Refunds clause of this Policy. The balance retained by the Company shall be deemed
                                    liquidated damages for the Client's breach.
                                </p>
                                <h4>Allocation of Alternative Property</h4>
                                <p>
                                    In lieu of rescission and refund, the Company may, at its sole discretion, allocate to
                                    the defaulting Client an alternative plot of land or property of equal value, whether
                                    located within the same estate or at a different location within the Company's portfolio.
                                    The determination of equal value shall be made by the Company based on its prevailing
                                    price list at the time of the allocation. The Client shall have no right to reject the
                                    alternative allocation on the grounds of location preference alone, provided the
                                    alternative property is of demonstrably equal or comparable value.
                                </p>
                                <h4>Variation of Decision</h4>
                                <p>
                                    The Company reserves the right, at its sole and absolute discretion, to vary, modify, or
                                    reverse any decision made under this clause at any time, including but not limited to:
                                    converting a rescission into an alternative allocation; converting an alternative
                                    allocation into a rescission and refund; substituting one alternative property for
                                    another; or varying either of the alternatives. Any such variation shall be communicated
                                    to the Client in writing.
                                </p>
                                <p>
                                    The Company shall notify the defaulting Client in writing of its decision within fourteen
                                    (14) business days of the Company's determination that a default has occurred. The notice
                                    shall specify:
                                </p>
                                <ul>
                                    <li>The nature of the default;</li>
                                    <li>The decision taken by the Company (rescission, alternative allocation, or other);</li>
                                    <li>The applicable cancellation charges and deductibles;</li>
                                    <li>The net refund amount payable (if any); and</li>
                                    <li>Any further action required of the Client.</li>
                                </ul>
                                <p>
                                    The Client shall have seven (7) business days from receipt of such notice to submit any
                                    representations to the Company, which the Company may consider but shall not be bound by.
                                </p>
                            </div>

                            {/* Cancellation and Refund Eligibility Tiers */}
                            <div className="policy-section">
                                <h3>Cancellation and Refund Eligibility Tiers</h3>
                                <p>
                                    A Client who is within their active payment timeline (i.e., still making instalment
                                    payments and has not yet completed Full Payment) may request cancellation and a partial
                                    refund at any time during such active payment timeline, subject to the cancellation fee
                                    framework and deductions set out in this Policy.
                                </p>
                                <p>
                                    For the avoidance of doubt, once Full Payment has been completed, the transaction is final
                                    and the Client shall not be entitled to any refund or cancellation, save as expressly
                                    provided in this Policy.
                                </p>
                                <p>
                                    Where the Company has commenced partial performance of the service at the time of the
                                    Client's cancellation request, the cancellation fee tier, site inspection and logistics
                                    fees, and other deductibles shall apply as set out in the Deductions from Refunds clause
                                    of this Policy.
                                </p>
                                <p>
                                    The right to cancel and request a refund during the active payment timeline does not apply
                                    to payments made in respect of time-sensitive transactions, auction deposits, or services
                                    that by their nature cannot be reversed once commenced.
                                </p>
                            </div>

                            {/* Refund Request Procedure */}
                            <div className="policy-section">
                                <h3>Refund Request Procedure</h3>
                                <p>
                                    Verbal or informal requests shall not constitute valid Refund Requests. All Refund
                                    Requests must be submitted by filling the <strong>REFUND REQUEST FORM</strong> contained
                                    within the appendix of this policy; and sending same to the Company via email at{' '}
                                    <strong>admin@eximps-cloves.com</strong> and copying{' '}
                                    <strong>legal@eximps-cloves.com</strong>; or by delivering same to the Company's
                                    registered office.
                                </p>
                                <p>
                                    Refund Requests must be submitted while the Client is within their active payment timeline
                                    or, in the case of a defaulting Client, within thirty (30) calendar days of the date of
                                    default.
                                </p>
                                <p>
                                    Refund Requests submitted after Full Payment has been completed shall not be entertained,
                                    save in respect of the Company's failure to deliver a property as provided in this Policy.
                                </p>
                                <p>
                                    Refund Requests submitted outside the applicable timelines may be rejected at the
                                    Company's sole discretion. The Company shall acknowledge receipt of a Refund Request
                                    within five (5) business days and shall endeavor to complete its review within fourteen
                                    (14) business days of receipt of all required information and documentation.
                                </p>
                                <p>
                                    The Company reserves the right to request additional information or documentation from the
                                    Client in support of the Refund Request. Failure to provide requested information within
                                    seven (7) business days may result in the Refund Request being deemed abandoned.
                                </p>
                            </div>

                            {/* Refund Assessment */}
                            <div className="policy-section">
                                <h3>Refund Assessment and Determination</h3>
                                <p>
                                    All Refund Requests shall be assessed by the Company on a case-by-case basis, taking into
                                    account the specific circumstances of each request, the terms of the applicable service
                                    agreement, the stage of performance of the service, and any applicable legal requirements.
                                </p>
                                <p>
                                    The Company shall notify the Client in writing of its decision regarding the Refund
                                    Request, including the amount of any approved refund and the reasons for any partial or
                                    full rejection.
                                </p>
                                <p>
                                    Where a refund is approved, the Company shall specify whether the refund is full or
                                    partial and the basis for any deductions made.
                                </p>
                            </div>

                            {/* Refund Payment Method */}
                            <div className="policy-section">
                                <h3>Refund Payment Method and Timeline</h3>
                                <p>
                                    Approved refunds shall be processed within the stated number of days as contained within
                                    the Company's refund assessment and notification.
                                </p>
                                <p>
                                    Refunds shall be made to the bank account provided by the Client within the Refund
                                    Request Form, unless the Client provides written instructions for an alternative payment
                                    method acceptable to the Company.
                                </p>
                                <p>
                                    All refund payments shall be made in Nigerian Naira (₦). Where the original payment was
                                    made in a foreign currency, the refund shall be calculated at the prevailing exchange rate
                                    on the date of the refund payment, and the Company shall not be liable for any exchange
                                    rate differences.
                                </p>
                                <p>
                                    The Company shall not be liable for any delays in refund payments caused by the Client's
                                    bank, payment processor, or other financial institution.
                                </p>
                            </div>

                            {/* Deductions from Refunds */}
                            <div className="policy-section">
                                <h3>Deductions from Refunds</h3>
                                <p>
                                    All approved refunds shall be subject to the following deductions, which shall be
                                    calculated and applied by the Company before any refund amount is disbursed to the Client:
                                </p>
                                <h4>Cancellation Fee</h4>
                                <p>
                                    A cancellation fee shall be charged on all Client-initiated refund requests, calculated
                                    as a percentage of the total amount already paid by the Client. The cancellation fee
                                    shall be determined with due regard to the guiding principles set out at the beginning of
                                    this Policy. The applicable cancellation fee tiers are as follows:
                                </p>
                                <ul>
                                    <li>
                                        <strong>Within Payment Period:</strong> Clients who request a refund within their
                                        active payment timeline will be eligible to receive <strong>70%</strong> of the total
                                        amount paid.
                                    </li>
                                    <li>
                                        <strong>Default on Instalment Plan:</strong> If a client fails to complete payment
                                        within the agreed instalment period and defaults after the deadline, the company will
                                        refund <strong>50%</strong> of the total amount paid.
                                    </li>
                                    <li>
                                        <strong>Full Payment (Outright):</strong> Once a client has completed 100% payment,
                                        the transaction is considered final, and <strong>no refund will be issued</strong>.
                                    </li>
                                </ul>
                                <h4>Site Inspection and Logistics Fees</h4>
                                <p>
                                    In addition to the cancellation fee, the Company shall deduct from the refund amount all
                                    site inspection and logistics costs actually incurred by the Company in connection with
                                    the Client's particular transaction. The Company shall prepare and deliver to the Client
                                    a detailed invoice itemizing all monies expended for site inspections, transportation,
                                    logistics, surveying, and any other related costs specific to that Client's transaction.
                                </p>
                                <h4>Other Deductibles</h4>
                                <p>
                                    The Company shall also deduct from the refund amount all other costs, charges, and
                                    expenses actually incurred in connection with the Client's transaction, including but not
                                    limited to: reservation costs; legal and documentation fees; property allocation efforts;
                                    resale disruption costs; administrative processing costs; bank charges and transfer fees;
                                    and any other legitimate expenses directly attributable to the Client's transaction.
                                </p>
                                <p>
                                    The net refund payable to the Client shall be calculated as follows: the applicable
                                    refund percentage (seventy percent (70%) or fifty percent (50%) of the total amount paid,
                                    as the case may be) less the site inspection and logistics fees, less the other
                                    deductibles set out above.
                                </p>
                                <p>
                                    Where the aggregate of the site inspection and logistics fees and other deductibles
                                    exceeds the applicable refund percentage amount, no refund shall be payable and the
                                    Client shall not be required to make any further payment to the Company in respect of
                                    such excess.
                                </p>
                            </div>

                            {/* Maximum Refund Cap */}
                            <div className="policy-section">
                                <h3>Maximum Refund Cap and Liability Limit</h3>
                                <p>
                                    The Company's total aggregate liability in respect of all refund claims made by a Client
                                    under this Refund Policy shall not exceed the applicable refund percentage (seventy
                                    percent (70%) or fifty percent (50%), as the case may be) of the total amount actually
                                    paid by the Client, less all applicable deductions.
                                </p>
                                <p>
                                    For the avoidance of doubt, once Full Payment has been completed, the Company's refund
                                    liability is nil, save for the sole exception relating to failure to deliver a property
                                    after Full Payment. Save for such specific exception (in which case a full refund of all
                                    sums paid shall be issued without application of the cancellation fee tiers), the maximum
                                    refundable amount under this Policy shall in no event exceed seventy percent (70%) of the
                                    total amount paid by the Client, and shall be further reduced by applicable site
                                    inspection and logistics fees and other deductibles.
                                </p>
                                <p>
                                    The Company shall not be liable for any indirect, consequential, incidental, special, or
                                    punitive damages, loss of profits, loss of opportunity, or any other economic loss arising
                                    from or in connection with any refund claim, howsoever arising.
                                </p>
                            </div>

                            {/* Escalation and Dispute Resolution */}
                            <div className="policy-section">
                                <h3>Escalation and Dispute Resolution</h3>
                                <p>
                                    If a client is dissatisfied with the Company's decision regarding a Refund Request, the
                                    Client may submit a written complaint to the Company's management within seven (7)
                                    business days of receiving the Company's decision. The Company's management shall review
                                    the complaint and issue a final response within fourteen (14) business days.
                                </p>
                                <p>
                                    If the dispute remains unresolved after the internal complaint process, either party shall
                                    refer the matter to mediation before a mutually agreed mediator; and the costs of
                                    mediation shall be shared equally between the parties.
                                </p>
                            </div>

                            {/* Consumer Protection Rights */}
                            <div className="policy-section">
                                <h3>Consumer Protection Rights</h3>
                                <p>
                                    The Company acknowledges and respects the Client's right to cancel purchases,
                                    transactions, and service agreements and to obtain refunds within the limits and scope as
                                    preserved and provided by applicable Nigerian laws. As such, the Company does not operate
                                    a no-refund policy and shall at all times ensure that consumer rights, including the right
                                    to refunds and the return of goods or reversal of services, are preserved and given full
                                    effect under this Refund Policy, subject to the Company's right to charge fair and
                                    reasonable cancellation fees as set out herein.
                                </p>
                                <p>
                                    Notwithstanding the foregoing, the Company equally reserves and shall enforce its lawful
                                    right to charge cancellation fees, site inspection and logistics fees, and other
                                    reasonable deductions as set out in the Deductions from Refunds clause of this Policy and
                                    as permitted by applicable Nigerian law.
                                </p>
                                <p>
                                    For the avoidance of doubt, the Client's statutory cancellation rights and the Company's
                                    right to charge lawful deductions and cancellation fees shall operate concurrently and
                                    shall each be exercised in accordance with and subject to the provisions of applicable
                                    Nigerian law.
                                </p>
                            </div>

                            {/* Records and Documentation */}
                            <div className="policy-section">
                                <h3>Records and Documentation</h3>
                                <p>
                                    Clients are advised to retain copies of all payment receipts, service agreements,
                                    correspondence, and other documentation relating to their transactions with the Company,
                                    as such documentation may be required in support of any Refund Request.
                                </p>
                            </div>

                            {/* Amendment */}
                            <div className="policy-section">
                                <h3>Amendment of This Policy</h3>
                                <p>
                                    The Company reserves the right to amend, modify, or replace this Refund Policy at any
                                    time at its sole discretion. Any amendments shall be effective upon publication on the
                                    Company's website or by any means chosen by the Company. Clients are responsible for
                                    reviewing this Policy periodically, and continued engagement of the Company's services
                                    following any amendments constitutes acceptance of the revised Policy.
                                </p>
                                <p>
                                    Notwithstanding the foregoing, any amendment to this Policy shall not affect Refund
                                    Requests that were validly submitted prior to the date of such amendment, which shall be
                                    assessed under the version of the Policy in effect at the time of submission.
                                </p>
                            </div>

                            {/* Contact */}
                            <div className="contact-legal">
                                <p>To submit a Refund Request or for any questions regarding this Policy, please contact us at:</p>
                                <p><strong>Email:</strong> admin@eximps-cloves.com</p>
                                <p><strong>CC:</strong> legal@eximps-cloves.com</p>
                                <p><strong>Address:</strong> 57B, Isaac John Street, Yaba, Lagos, Nigeria</p>
                            </div>

                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

export default Refund;
