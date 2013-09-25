<?php

namespace Tests\Behat\Gherkin\Filter;

use Behat\Gherkin\Filter\TagFilter;
use Behat\Gherkin\Node\FeatureNode;
use Behat\Gherkin\Node\ScenarioNode;

class TagFilterTest extends \PHPUnit_Framework_TestCase
{
    public function testIsFeatureMatchFilter()
    {
        $feature = new FeatureNode(null, null, array(), null, array(), null, null, null, 1);

        $filter = new TagFilter('@wip');
        $this->assertFalse($filter->isFeatureMatch($feature));

        $feature = new FeatureNode(null, null, array('wip'), null, array(), null, null, null, 1);
        $this->assertTrue($filter->isFeatureMatch($feature));

        $filter = new TagFilter('~@done');
        $this->assertTrue($filter->isFeatureMatch($feature));

        $feature = new FeatureNode(null, null, array('wip', 'done'), null, array(), null, null, null, 1);
        $this->assertFalse($filter->isFeatureMatch($feature));

        $feature = new FeatureNode(null, null, array('tag1', 'tag2', 'tag3'), null, array(), null, null, null, 1);
        $filter = new TagFilter('@tag5,@tag4,@tag6');
        $this->assertFalse($filter->isFeatureMatch($feature));

        $feature = new FeatureNode(null, null, array(
            'tag1',
            'tag2',
            'tag3',
            'tag5'
        ), null, array(), null, null, null, 1);
        $this->assertTrue($filter->isFeatureMatch($feature));

        $filter = new TagFilter('@wip&&@vip');
        $feature = new FeatureNode(null, null, array('wip', 'done'), null, array(), null, null, null, 1);
        $this->assertFalse($filter->isFeatureMatch($feature));

        $feature = new FeatureNode(null, null, array('wip', 'done', 'vip'), null, array(), null, null, null, 1);
        $this->assertTrue($filter->isFeatureMatch($feature));

        $filter = new TagFilter('@wip,@vip&&@user');
        $feature = new FeatureNode(null, null, array('wip'), null, array(), null, null, null, 1);
        $this->assertFalse($filter->isFeatureMatch($feature));

        $feature = new FeatureNode(null, null, array('vip'), null, array(), null, null, null, 1);
        $this->assertFalse($filter->isFeatureMatch($feature));

        $feature = new FeatureNode(null, null, array('wip', 'user'), null, array(), null, null, null, 1);
        $this->assertTrue($filter->isFeatureMatch($feature));

        $feature = new FeatureNode(null, null, array('vip', 'user'), null, array(), null, null, null, 1);
        $this->assertTrue($filter->isFeatureMatch($feature));
    }

    public function testIsScenarioMatchFilter()
    {
        $scenario = new ScenarioNode(null, array(), array(), null, 2);
        $feature = new FeatureNode(null, null, array(), null, array($scenario), null, null, null, 1);

        $filter = new TagFilter('@wip');
        $this->assertFalse($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array(), array(), null, 2);
        $feature = new FeatureNode(null, null, array('wip'), null, array($scenario), null, null, null, 1);
        $this->assertTrue($filter->isScenarioMatch($scenario));

        $filter = new TagFilter('~@done');
        $this->assertTrue($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array(), array(), null, 2);
        $feature = new FeatureNode(null, null, array('wip', 'done'), null, array($scenario), null, null, null, 1);
        $this->assertFalse($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array(), array(), null, 2);
        $feature = new FeatureNode(null, null, array(
            'tag1',
            'tag2',
            'tag3'
        ), null, array($scenario), null, null, null, 1);
        $filter = new TagFilter('@tag5,@tag4,@tag6');
        $this->assertFalse($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array(), array(), null, 2);
        $feature = new FeatureNode(null, null, array(
            'tag1',
            'tag2',
            'tag3',
            'tag5'
        ), null, array($scenario), null, null, null, 1);
        $this->assertTrue($filter->isScenarioMatch($scenario));

        $filter = new TagFilter('@wip&&@vip');
        $scenario = new ScenarioNode(null, array(), array(), null, 2);
        $feature = new FeatureNode(null, null, array('wip', 'not-done'), null, array($scenario), null, null, null, 1);
        $this->assertFalse($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array(), array(), null, 2);
        $feature = new FeatureNode(null, null, array(
            'wip',
            'not-done',
            'vip'
        ), null, array($scenario), null, null, null, 1);
        $this->assertTrue($filter->isScenarioMatch($scenario));

        $filter = new TagFilter('@wip,@vip&&@user');
        $scenario = new ScenarioNode(null, array(), array(), null, 2);
        $feature = new FeatureNode(null, null, array(
            'wip'
        ), null, array($scenario), null, null, null, 1);
        $this->assertFalse($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array(), array(), null, 2);
        $feature = new FeatureNode(null, null, array(
            'vip'
        ), null, array($scenario), null, null, null, 1);
        $this->assertFalse($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array(), array(), null, 2);
        $feature = new FeatureNode(null, null, array(
            'wip',
            'user'
        ), null, array($scenario), null, null, null, 1);
        $this->assertTrue($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array(), array(), null, 2);
        $feature = new FeatureNode(null, null, array(
            'vip',
            'user'
        ), null, array($scenario), null, null, null, 1);
        $this->assertTrue($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array(), array(), null, 2);
        $feature = new FeatureNode(null, null, array(), null, array($scenario), null, null, null, 1);

        $filter = new TagFilter('@wip');
        $this->assertFalse($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array(), array(), null, 2);
        $feature = new FeatureNode(null, null, array('wip'), null, array($scenario), null, null, null, 1);
        $this->assertTrue($filter->isScenarioMatch($scenario));

        $filter = new TagFilter('~@done');
        $this->assertTrue($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array(), array(), null, 2);
        $feature = new FeatureNode(null, null, array('wip', 'done'), null, array($scenario), null, null, null, 1);
        $this->assertFalse($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array('tag1', 'tag3', 'tag3'), array(), null, 2);
        $feature = new FeatureNode(null, null, array('wip'), null, array($scenario), null, null, null, 1);
        $filter = new TagFilter('@tag5,@tag4,@tag6');
        $this->assertFalse($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array('tag1', 'tag3', 'tag3'), array(), null, 2);
        $feature = new FeatureNode(null, null, array('wip', 'tag5'), null, array($scenario), null, null, null, 1);
        $this->assertTrue($filter->isScenarioMatch($scenario));

        $filter = new TagFilter('@wip&&@vip');
        $scenario = new ScenarioNode(null, array('wip', 'not-done'), array(), null, 2);
        $feature = new FeatureNode(null, null, array('wip'), null, array($scenario), null, null, null, 1);
        $this->assertFalse($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array('wip', 'not-done'), array(), null, 2);
        $feature = new FeatureNode(null, null, array('wip', 'vip'), null, array($scenario), null, null, null, 1);
        $this->assertTrue($filter->isScenarioMatch($scenario));

        $filter = new TagFilter('@wip,@vip&&@user');
        $scenario = new ScenarioNode(null, array('wip'), array(), null, 2);
        $feature = new FeatureNode(null, null, array('wip'), null, array($scenario), null, null, null, 1);
        $this->assertFalse($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array('vip'), array(), null, 2);
        $feature = new FeatureNode(null, null, array('wip'), null, array($scenario), null, null, null, 1);
        $this->assertFalse($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array('wip', 'user'), array(), null, 2);
        $feature = new FeatureNode(null, null, array('wip'), null, array($scenario), null, null, null, 1);
        $this->assertTrue($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array('vip', 'user'), array(), null, 2);
        $feature = new FeatureNode(null, null, array('wip'), null, array($scenario), null, null, null, 1);
        $this->assertTrue($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array('user'), array(), null, 2);
        $feature = new FeatureNode(null, null, array('wip'), null, array($scenario), null, null, null, 1);
        $this->assertTrue($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array('user'), array(), null, 2);
        $feature = new FeatureNode(null, null, array(), null, array($scenario), null, null, null, 1);
        $this->assertFalse($filter->isScenarioMatch($scenario));

        $filter = new TagFilter('@wip,@vip&&~@group');
        $scenario = new ScenarioNode(null, array('user'), array(), null, 2);
        $feature = new FeatureNode(null, null, array('vip'), null, array($scenario), null, null, null, 1);
        $this->assertTrue($filter->isScenarioMatch($scenario));

        $scenario = new ScenarioNode(null, array('user', 'group'), array(), null, 2);
        $feature = new FeatureNode(null, null, array('vip'), null, array($scenario), null, null, null, 1);
        $this->assertFalse($filter->isScenarioMatch($scenario));
    }
}
