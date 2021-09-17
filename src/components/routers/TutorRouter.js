import { Route, Switch } from "react-router-dom";

import Home from "pages/Home";
import PaymentSlipCheck from "pages/tutor/ManagePayments";
import Dashboard from "pages/tutor/Dashboard";
import ApplicationForm from "pages/tutor/ApplicationForm";
import ClassDetails from "pages/tutor/ClassDetails";
import StudentPaymentDetails from "pages/tutor/StudentPaymentDetails";
import AddNewClasses from "pages/tutor/AddNewClasses"
import NotFound404 from "pages/NotFound404";
import ManagePayments from "pages/tutor/ManagePayments";

export default function TutorRouter() {
    return (
        <>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/managepayments" component={ManagePayments} />
            <Route exact path="/applicationform" component={ApplicationForm} />
            <Route exact path="/classdetails" component={ClassDetails} />
            <Route exact path="/studentpaymentdetails" component={StudentPaymentDetails} />
            <Route exact path="/addnewclasses" component={AddNewClasses} />
            <Route component={NotFound404} />
        </Switch>
        </>
    );
}