import { Route, Switch } from "react-router-dom";

import Home from "pages/Home";
import PaymentSlipCheck from "pages/tutor/PaymentSlipCheck";
import Dashboard from "pages/tutor/Dashboard";

import SubjectPage from "pages/tutor/subjectPage";

import ApplicationForm from "pages/tutor/ApplicationForm";

import NotFound404 from "pages/NotFound404";

import Profile from "pages/student/Profile";

export default function TutorRouter() {
    return (
        <>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/subjectPage" component={SubjectPage} />
            <Route exact path="/paymentslipcheck" component={PaymentSlipCheck} />
            <Route exact path="/applicationform" component={ApplicationForm} />
            <Route exact path="/profile" component={Profile} />
            <Route component={NotFound404} />
        </Switch>
        </>
    );
}