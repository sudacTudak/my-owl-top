import { withLayout } from "../Layout/Layout";
import { Page404Component } from "../page-components/Page404Component/Page404Component";

export const Page404 = (): JSX.Element => (
  <Page404Component/>
);

export default withLayout(Page404);
