Feature: Widget Categories
	as a content author 
	i need to be able to see the widget categories that are available
	so that i can refine the widget list to only show those which i am interested in

Scenario: Tray contains categories
	Given the tray is visible
	Then I should see the categories:
		| Bill Murray |
		| Search |
		| System Information |
		| User Information |

Scenario: Category contains widgets
	Given the tray is visible
	When I click on the "Bill Murray" category
	Then I should see the widgets:
		| Fill Murray |
		| Image |

Scenario: Show widget details
	Given the tray is visible
	When I click on the "Bill Murray" category
	Then I should see the widgets:
		| Fill Murray |
		| Image |
	When I click on the "Fill Murray" widget
	Then the widget title should be "Fill Murray"
	And the drag handler "data-widget-guid" attribute should be "fillmurray"
	And the drag handler "data-widget-title" attribute should be "Fill Murray"
	And the drag handler "data-widget-description" attribute should be "Some Bill Murray Placeholder"
	And the drag handler "data-last-appended" attribute should be "true"

Scenario: Drag widget to existing row
	Given I am on the "fillmurray" homepage
	And row 1 contains the widget:
		| fillmurray |
	When I open the tray
	And I click on the "Bill Murray" category
	And I click on the "Image" widget
	When I drag the handle to row 1
	Then row 1 should contain the widgets:
		| fillmurray |
		| image |

Scenario: Drag widget to new row
	Given I have a row with 1 widget
	And I click on the "Bill Murray" category
	And I click on the "Image" widget
	When I drag the handle to the new row
	Then the new row should contain the widget:
		| image |

Scenario: Dragging widget should create a new row
	Given I have a row with 1 widget
	And I click on the "Bill Murray" category
	When I start dragging the "Image" widget
	Then a new row should be created

Scenario: New row should be removed when dragging stops
	Given I have a row with 1 widget
	And I click on the "Bill Murray" category
	And I start dragging the "Image" widget
	When I stop dragging
	Then the new row should be removed