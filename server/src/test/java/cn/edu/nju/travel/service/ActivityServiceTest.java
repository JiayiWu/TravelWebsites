package cn.edu.nju.travel.service;

import cn.edu.nju.travel.constant.ActivityStateCode;
import cn.edu.nju.travel.constant.JoinTypeCode;
import cn.edu.nju.travel.form.ActivityForm;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityServiceTest {

    @Autowired
    ActivityService activityService;


    //获取活动列表
    @Test
    public void testGetActivityList(){
        Timestamp timestamp = new Timestamp(1l);
        Integer size = 5;
        try {
            activityService.getActivityList(timestamp,size);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //创建新活动
    @Test
    public void testCreateActivity(){
        String location = "it's test for sonarqube";
        String title = "titleee";
        String coverUrl = "it's test for sonarqube";
        String description = "it's test for sonarqube";

        Long startTime = 2000000000l;
        Long endTime = 2000000009l;
        Integer createId = 3;
        Integer joinType = JoinTypeCode.AUTH.getIndex();//need to apply

        try {
            activityService.createActivity(createId, title,     location, startTime, endTime, joinType, coverUrl, description);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    //审批活动通过
    @Test
    public void testCheckActivityState(){
        Integer activityId = 1;
        Integer result = ActivityStateCode.VALID.getIndex();
        try {
            activityService.checkActivityState(activityId,result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //获取活动信息
    @Test
    public void testFindActivityById(){
        Integer id = 1;
        try {
            activityService.findActivityById(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testIsCreator(){
        Integer activityId = 1;
        Integer userId = 3;
        try {
            activityService.isCreator(activityId,userId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //获取多个活动的信息
    @Test
    public void testFindAllById(){
        List<Integer> ids = new ArrayList<>();
        ids.add(1);
        ids.add(2);

        try {
            activityService.findAllById(ids);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //更新活动
    @Test
    public void testUpdateActivity(){

        ActivityForm activityForm = new ActivityForm();
        activityForm.setId(4);
        activityForm.setLocation("it's test for sonarqube");
        activityForm.setStartTime(2000000000);
        activityForm.setEndTime(2000000009);
        activityForm.setJoinType(JoinTypeCode.AUTH.getIndex());
        activityForm.setCoverUrl("it's test for sonarqube");
        activityForm.setDescription("update at follow test");
        try {
            activityService.updateActivityInfo(activityForm);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testGetAuthActivityList(){
        Integer state = -1;
        try {
            activityService.getAuthActivityList(-1);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
