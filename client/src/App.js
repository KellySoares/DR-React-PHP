import Layout from "./layout";
import MainRoutes from "./layout/routes";
import { BrowserRouter as Router } from 'react-router-dom';
import CalProvider from "./providers/calPaint";

const App = () => {
  return (<>
    <CalProvider>
      <Router>
        <Layout>
          <MainRoutes />
        </Layout>
      </Router>
    </CalProvider>
  </>
  );
}

export default App;
