export default function Tabs ({children, buttons, ButtonsContainer = 'menu'}) { //Setting default prop value
    //const ButtonsContainer = buttonsContainer;
    return (
    <>
     <ButtonsContainer>
       {buttons} 
     </ButtonsContainer>
     {children}
    </>
    )
}