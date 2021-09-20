import { configure, shallow } from 'enzyme';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import NavigationItems from '../NavigationItems/NavigationItems';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () =>{
    let wrapper;
    beforeEach( () => {
        wrapper = shallow( <NavigationItems />);
    });

    it('should render 2 <NavigationItem /> elements if not authenticated', () => {
        expect( wrapper.find( NavigationItem ) ).toHaveLength(2);

    })

    it('should render 3 <NavigationItem /> elements if authenticated', () => {
        // wrapper = shallow( <NavigationItems authenticated/>);
        wrapper.setProps({authenticated : true })
        expect( wrapper.find( NavigationItem ) ).toHaveLength(3);
    });
    
    it('should logged out if authenticated', () => {
        wrapper = shallow( <NavigationItems authenticated/>);
        expect( wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>) ).toEqual(true);
    });
});