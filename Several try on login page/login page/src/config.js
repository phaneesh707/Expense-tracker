import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Notes.css";

const config = {
STRIPE_KEY: "pk_test_51HsacWKhnoHEibBcPBCC0z9WzNlTQWyCw9IxsLCAUgkN4CV1sYxTkggqEEpchsjGWeDXlittF3XeABWcY9BEpaLt005LpkFo1N",
MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-west-1",
    BUCKET: "expensetracker-hidetra",
  },
  apiGateway: {
    REGION: "us-west-1",
    URL: "https://dqntcuqrb6.execute-api.us-west-1.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-west-1",
    USER_POOL_ID: "us-west-1_nDguuiq0o",
    APP_CLIENT_ID: "52qcqt2ntnjafvotfp5i24d25k",
    IDENTITY_POOL_ID: "us-west-1:2a713f23-a576-4cbc-9b5a-4a9c4c826055",
  },
};

export default config;