import { Home } from "./pages";
import { Localization, State, Theme } from "./providers";

const App = () => {
  return (
    <Theme>
      <Localization>
        <State>
          <Home />
        </State>
      </Localization>
    </Theme>
  );
};

export default App;
