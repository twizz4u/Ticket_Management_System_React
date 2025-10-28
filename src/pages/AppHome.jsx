import AppNavbar from "../component/AppNavbar";
import AppHero from "../component/AppHero";
import AppFeature from "../component/AppFeature";
import AppFooter from "../component/AppFooter";

function AppHome() {
  return (
    <section>
      <AppNavbar />
      <AppHero />
      <AppFeature />
      <AppFooter />
    </section>
  );
}

export default AppHome;
