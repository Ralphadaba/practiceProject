import { useState } from "react";
import TabButton from './TabButton.jsx'
import Section from './Section.jsx'
import { EXAMPLES } from "../data";
import Tabs from "./Tabs.jsx";

export default function Examples() {
    const [selectedTopic, setSelectedTopic] = useState();

    function handleSelect(selectedButton) {
        // selectedButton => 'components', 'jsx', 'props', 'state'
        setSelectedTopic(selectedButton)
        console.log(selectedTopic);
    }

    let tabContent = <p>Please select a topic</p>;
    if (selectedTopic) {
        tabContent = (
            <div id="tab-content">
                <h3>{EXAMPLES[selectedTopic].title}</h3>
                <p>{EXAMPLES[selectedTopic].description}</p>
                <pre>
                    <code>{EXAMPLES[selectedTopic].code}</code>
                </pre>
            </div>
        );
    }

    return (
        <Section title="Examples" id="examples">
            <Tabs
           // ButtonsContainer="menu" //String identifier for built in menu component
                buttons={
                    <>
                        <TabButton
                            isSelected={selectedTopic === 'components'} //This is saying is the value in selectedTopic equal to  
                            onClick={() => handleSelect('components')} // components? if yes pass the value to isSelected to run   
                        >
                            Components
                        </TabButton>
                        <TabButton
                            isSelected={selectedTopic === 'jsx'}//If you click components button, this button and the others will not be passed
                            onClick={() => handleSelect('jsx')}//to isSelected and will not run as such because the value is not equal to components
                        >
                            JSX
                        </TabButton>
                        <TabButton
                            isSelected={selectedTopic === 'props'}
                            onClick={() => handleSelect('props')}
                        >
                            Props
                        </TabButton>
                        <TabButton
                            isSelected={selectedTopic === 'state'}
                            onClick={() => handleSelect('state')}
                        >
                            State
                        </TabButton>
                    </>
                }
            >
                {selectedTopic}
                {tabContent}
            </Tabs>
        </Section>
    );
}