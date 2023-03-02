import Header from "./header/header";
import {Layout} from "antd"
import Sidebar from "./sidebar/sidebar";
import Contents from "./content/content";
function Layouts() {
    return (
        <Layout>
            <Sidebar/>
            <Layout>
                <Header/>
                <Contents/>
            </Layout>
        </Layout>
    );
}

export default Layouts;