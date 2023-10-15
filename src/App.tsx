import {
  HelmetProvider,
  MessageProvider,
  Router,
  SharedProvider,
  StoreProvider,
  ThemeProvider,
} from "components/wrapper";
import "./styles/App.less";
import { pagePaths } from "constants";

function App() {
  return (
    <StoreProvider>
      <HelmetProvider>
        <ThemeProvider>
          <MessageProvider>
            <SharedProvider>
            <Router defaultRoute={pagePaths.home} />
            </SharedProvider>
          </MessageProvider>
        </ThemeProvider>
      </HelmetProvider>
    </StoreProvider>
  );
}

export default App;
