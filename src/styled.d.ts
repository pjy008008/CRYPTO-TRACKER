// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    backgroundColor: string;
    accentColor: string;
    ContainerBgColor: string;
    coinListColor: string;
    toggleBtnColor:string;
  }
}
