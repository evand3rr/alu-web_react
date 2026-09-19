import React from 'react';
import { shallow } from 'enzyme';
import { getLatestNotification } from '../utils/utils';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
	StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
	StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

const listNotifications = [
	{ id: 1, type: 'default', value: 'New course available' },
	{ id: 2, type: 'urgent', value: 'New resume available' },
	{ id: 3, type: 'urgent', html: getLatestNotification() },
];

describe('Notification tests', () => {
	it('renders Notification component without crashing', () => {
		const wrapper = shallow(<Notifications />);

		expect(wrapper).toBeDefined();
	});

	it('renders correct list items', () => {
		const wrapper = shallow(
			<Notifications
				displayDrawer={true}
				listNotifications={listNotifications}
			/>
		);
		expect(wrapper.find('ul').children()).toHaveLength(
			listNotifications.length
		);
		wrapper.find('ul').forEach((node) => {
			expect(node.equals(<NotificationItem />));
		});
		const firstItem = wrapper.find('ul').childAt(0).dive();
		const secondItem = wrapper.find('ul').childAt(1).dive();
		const thirdItem = wrapper.find('ul').childAt(2).dive();

		expect(firstItem.prop('data-notification-type')).toBe(
			'default'
		);
		expect(firstItem.text()).toBe('New course available');
		expect(firstItem.hasClass('default_1tsdo2i')).toBe(
			true
		);
		expect(secondItem.prop('data-notification-type')).toBe(
			'urgent'
		);
		expect(secondItem.text()).toBe('New resume available');
		expect(secondItem.hasClass('urgent_137u7ef')).toBe(
			true
		);
		expect(thirdItem.prop('dangerouslySetInnerHTML')).toEqual(
			getLatestNotification()
		);
		expect(thirdItem.hasClass('urgent_137u7ef')).toBe(
			true
		);
	});

	it('renders an unordered list', () => {
		const wrapper = shallow(
			<Notifications
				displayDrawer={true}
				listNotifications={listNotifications}
			/>
		);
		expect(wrapper.find('ul').children()).toHaveLength(3);
		wrapper.find('ul').forEach((node) => {
			expect(node.equals(<NotificationItem />));
		});
	});

	it('renders correct text', () => {
		const wrapper = shallow(<Notifications displayDrawer={true} />);

		expect(wrapper.contains(<p>Here is the list of notifications</p>)).toBe(
			false
		);
	});

	it('displays menu item when displayDrawer is false', () => {
		const wrapper = shallow(<Notifications displayDrawer={false} />);

		expect(wrapper.find('p').filterWhere((node) =>
			node.text() === 'Your notifications'
		)).toHaveLength(1);
	});

	it('does not display notifications when displayDrawer is false', () => {
		const wrapper = shallow(<Notifications displayDrawer={false} />);

		expect(wrapper.find('ul').exists()).toBe(false);
	});

	it('does not display menuItem when displayDrawer is true', () => {
		const wrapper = shallow(<Notifications displayDrawer={true} />);

		expect(wrapper.find('p').filterWhere((node) =>
			node.text() === 'Your notifications'
		)).toHaveLength(0);
	});

	it('displays Notifications when displayDrawer is true', () => {
		const wrapper = shallow(<Notifications displayDrawer={true} />);

		expect(wrapper.find('ul').exists()).toBe(true);
	});

	it('renders correctly when listCourses is not passed', () => {
		const wrapper = shallow(<Notifications displayDrawer={true} />);

		expect(
			wrapper.containsMatchingElement(
				<li data-notification-type='default'>No new notification for now</li>
			)
		);
	});

	it('renders correctly when empty array is passed', () => {
		const wrapper = shallow(
			<Notifications displayDrawer={true} listNotifications={[]} />
		);

		expect(
			wrapper.containsMatchingElement(
				<li data-notification-type='default'>No new notification for now</li>
			)
		);
	});

	it('renders correctly when listNotifications is passed and with the right number of notifications', () => {
		const wrapper = shallow(
			<Notifications
				displayDrawer={true}
				listNotifications={listNotifications}
			/>
		);

		expect(wrapper.find('ul').children()).toHaveLength(3);
		wrapper.find('ul').forEach((node) => {
			expect(node.equals(<NotificationItem />));
		});
	});

	it('renders "No new notifications for now" instead of "Here is the list of notifications" when listNotifications is empty', () => {
		const wrapper = shallow(
			<Notifications displayDrawer={true} listNotifications={[]} />
		);

		expect(
			wrapper.containsMatchingElement(<p>Here is the list of notifications</p>)
		).toBe(false);

		expect(
			wrapper.containsMatchingElement(
				<li data-notification-type='default'>No new notification for now</li>
			)
		);
	});

	it('doesnt re-render when the list passed as prop is the same', () => {
		const wrapper = shallow(
			<Notifications
				displayDrawer={true}
				listNotifications={listNotifications}
			/>
		);

		expect(wrapper.instance().shouldComponentUpdate(listNotifications)).toBe(
			false
		);
	});

	it('re-renders if listNotifications if listNotifications is changed', () => {
		const newListNotifications = [
			{ id: 1, type: 'default', value: 'New course available' },
			{ id: 2, type: 'urgent', value: 'New resume available' },
			{ id: 3, type: 'default', html: getLatestNotification() },
			{ id: 4, type: 'default', value: 'Foo' },
		];

		const wrapper = shallow(
			<Notifications
				displayDrawer={true}
				listNotifications={listNotifications}
			/>
		);

		expect(wrapper.instance().shouldComponentUpdate(newListNotifications)).toBe(
			true
		);
	});
});

describe('onclick event behaves as it should', () => {
	it('should call console.log', () => {
		const wrapper = shallow(<Notifications />);
		const spy = jest.spyOn(console, 'log').mockImplementation();

		wrapper.instance().markAsRead = spy;
		wrapper.instance().markAsRead(1);
		expect(wrapper.instance().markAsRead).toBeCalledWith(1);
		expect(spy).toBeCalledTimes(1);
		expect(spy).toBeCalledWith(1);
		spy.mockRestore();
	});
});
