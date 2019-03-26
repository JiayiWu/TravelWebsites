package cn.edu.nju.travel.controller;

import cn.edu.nju.travel.form.*;
import cn.edu.nju.travel.service.ActivityService;
import cn.edu.nju.travel.service.RelationService;
import cn.edu.nju.travel.service.UserService;
import cn.edu.nju.travel.utils.ServerException;
import cn.edu.nju.travel.vo.ActivityInfoVO;
import cn.edu.nju.travel.vo.AuthenticationInfoListVO;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.List;

/**
 * 该审批用AuditEntity表
 * Created by Jiayiwu on 19/1/13.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@RestController
@RequestMapping("/activity/")
public class ActivityController {

    @Autowired
    ActivityService activityService;

    @Autowired
    UserService userService;

    @Autowired
    RelationService relationService;

    @ApiOperation(value = "创建活动", response = SimpleResponse.class, notes = "创建成功返回0")
    @RequestMapping(value = "check", method = RequestMethod.POST)
    public SimpleResponse createActivity(HttpSession httpSession,
                                         @RequestBody ActivityForm activityCreateForm){
        try{
            //id?
            activityService.createActivity(activityCreateForm.getCreateId(),
                    activityCreateForm.getTitle(),
                    activityCreateForm.getLocation(),
                    activityCreateForm.getStartTime(),
                    activityCreateForm.getEndTime(),
                    activityCreateForm.getJoinType(),
                    activityCreateForm.getCoverUrl(),
                    //todo
                    //中文编码问题
                    activityCreateForm.getDescription());

        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
        return SimpleResponse.ok(0);
    }


    /**
     *
     * 海强、阳阳这边要做分页，不要直接用内存分页。具体分页措施用时间戳分页，activityListForm里面传入了最后一次时间戳，
     * 可以select * from activity where startTime < #{lastTimestamp} limit #{size}来做分页
     *
     * @param httpSession
     * @param activityListForm
     * @return
     */
    @ApiOperation(value = "查看活动列表", response = ActivityInfoVO.class,notes = "返回List<ActivityInfoVO>,只返回审批通过的、尚未结束的活动")
    @RequestMapping(value = "list", method = RequestMethod.POST)
    public SimpleResponse ActivityInfoList(HttpSession httpSession, @RequestBody ActivityListForm activityListForm){
        try{
            //todo
            //you bug
            List<ActivityInfoVO> activityInfoVOList =
                    activityService.getActivityList(new Timestamp(activityListForm.getLastTimestamp()),
                    activityListForm.getSize());
            return SimpleResponse.ok(activityInfoVOList);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }


    @ApiOperation(value = "查看活动详细信息", response = ActivityInfoVO.class)
    @RequestMapping(value = "info/{id}", method = RequestMethod.GET)
    public SimpleResponse getActivityInfo(HttpSession httpSession, @PathVariable int id){
        try{
            ActivityInfoVO activityInfoVO = activityService.findActivityById(id);
            return SimpleResponse.ok(activityInfoVO);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value = "查看用户创建的所有活动的列表", response = ActivityInfoVO.class)
    @RequestMapping(value = "list/{creatorid}", method = RequestMethod.GET)
    public SimpleResponse getActivityListByCreate(HttpSession httpSession, @PathVariable int creatorid){

        try{
            List<ActivityInfoVO> activityInfoVOList = activityService.getActivitiesByCreatorId(creatorid);

            return SimpleResponse.ok(activityInfoVOList);
        }catch (Exception e){

            return SimpleResponse.exception(e);

        }

    }


    @ApiOperation(value = "参加活动", response = SimpleResponse.class)
    @RequestMapping(value = "attend", method = RequestMethod.POST)
    public SimpleResponse attendActivity(HttpSession httpSession, @RequestBody AttendActivityForm attendActivityForm){
        try{
            relationService.attendActivity(attendActivityForm.getActivityId(),attendActivityForm.getUserId(),
                    attendActivityForm.getAttachmentUrl(),attendActivityForm.getContext());
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
        return SimpleResponse.ok(0);
    }

    @ApiOperation(value = "离开某个活动", response = SimpleResponse.class)
    @RequestMapping(value = "quit/{activityId}/user/{userId}", method = RequestMethod.POST)
    public SimpleResponse quitActivity(HttpSession httpSession, @PathVariable int activityId,@PathVariable int userId){
        try {
            relationService.quitActivity(activityId,userId);
            return SimpleResponse.ok(0);
        } catch (Exception e) {
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value = "取消某个活动", response = SimpleResponse.class , notes = "需要验证当前登录用户是否有权限删除；管理员或者创建者有权限")
    @RequestMapping(value = "cancel/{activityId}", method = RequestMethod.POST)
    public SimpleResponse cancelActivity(HttpSession httpSession, @PathVariable int activityId){
        try {
            if(httpSession.getAttribute("userId") == null ){
                return SimpleResponse.exception(new ServerException(ResponseCode.Error, "没有登录"));
            }
            Integer id = (Integer) httpSession.getAttribute("userId");

//            Integer id = 3;

            if(userService.isAdmin(id) || activityService.isCreator(activityId, id)){
                activityService.cancelActivity(activityId);
                return SimpleResponse.ok(0);
            } else {
                return SimpleResponse.exception(new ServerException(ResponseCode.Error, "没有权限"));
            }
        } catch (Exception e) {
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value = "结束某个活动", response = SimpleResponse.class, notes = "只有活动的创建者可以结束活动")
    @RequestMapping(value = "end/{activityId}", method = RequestMethod.POST)
    public SimpleResponse qendActivity(HttpSession httpSession, @PathVariable int activityId){
        try {
            if(httpSession.getAttribute("userId") == null ){
                return SimpleResponse.exception(new ServerException(ResponseCode.Error, "没有登录"));
            }
            Integer id = (Integer) httpSession.getAttribute("userId");
//            Integer id = 3;
            if(activityService.isCreator(activityId, id)){
                activityService.endActivity(activityId);
                return SimpleResponse.ok(0);
            } else {
                return SimpleResponse.exception(new ServerException(ResponseCode.Error, "没有权限"));
            }
        } catch (Exception e) {
            return SimpleResponse.exception(e);
        }
    }


    @ApiOperation(value = "更新某个活动", response = ActivityInfoVO.class)
    @RequestMapping(value = "update", method = RequestMethod.POST)
    public SimpleResponse updateActivity(HttpSession httpSession, @RequestBody ActivityForm activityCreateForm){
        try{
            activityService.updateActivityInfo(activityCreateForm);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
        return SimpleResponse.ok(0);
    }



    @ApiOperation(value = "审批用户加入申请", response = SimpleResponse.class,notes = "需要校验当前登录用户是否有审批权限 0 新申请审批，还未处理 1 审批通过  2  审批拒绝")
    @RequestMapping(value = "application/check/{activityId}/user/{userId}/result/{result}", method = RequestMethod.POST)
    public SimpleResponse checkApplication(HttpSession httpSession, @PathVariable int activityId,@PathVariable int userId,@PathVariable int result){


        try {
            Integer creatorId = (Integer) httpSession.getAttribute("userId");
//            Integer creatorId = 3;
            if (activityService.isCreator(activityId,creatorId)){
                relationService.auditAttendActivity(activityId,userId,result);
            }else {
                throw new ServerException(ResponseCode.Error,"不是创建者，没有审批权限");
            }
            return SimpleResponse.ok("success");
        } catch (Exception e) {
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value = "审批列表", response = AuthenticationInfoListVO.class,notes = "返回List<AuthenticationInfoListVO>; state -1获取该用户可以看见的所有审批，0 查看待处审批 1 查看审批通过申请  2  查看审批拒绝的申请")
    @RequestMapping(value = "application/list/{state}", method = RequestMethod.GET)
    public SimpleResponse applicationList(HttpSession httpSession,@PathVariable int state){
        try {
            //todo
            //分页
            Integer creatorId = (Integer) httpSession.getAttribute("userId");
//            Integer creatorId = 3;
            List<AuthenticationInfoListVO> authenticationInfoListVOList = relationService.getAuditInfoList(creatorId,state);
            return SimpleResponse.ok(authenticationInfoListVOList);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }

    }


    /**
     *
     * @param httpSession
     * @param size
     * @return
     */
    @ApiOperation(value = "查看推荐活动列表", response = ActivityInfoVO.class,notes = "返回List<ActivityInfoVO>,只返回审批通过的、尚未结束的活动")
    @RequestMapping(value = "recommendation/{size}", method = RequestMethod.GET)
    public SimpleResponse RecommendActivityInfoList(HttpSession httpSession, @PathVariable int size){
        try{
            List<ActivityInfoVO> activityInfoVOList =
                    activityService.getRecommendationActivities(size);
            return SimpleResponse.ok(activityInfoVOList);
        }catch (Exception e){
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value = "关键字匹配活动", response = ActivityInfoVO.class, notes =
            "返回名称、地点或描述中匹配关键字的List<ActivityInfoVO>,只返回审批通过的、尚未结束的活动")
    @GetMapping("searchList")
    public SimpleResponse searchActivity(HttpSession httpSession, @RequestParam int size,
            @RequestParam String keyword, @RequestParam int lastId){
        try{
            List<ActivityInfoVO> activityInfoVOList = activityService.searchActivities(size,
                    keyword, lastId);
            return SimpleResponse.ok(activityInfoVOList);
        } catch (Exception e) {
            return SimpleResponse.exception(e);
        }
    }

    @ApiOperation(value = "最新活动", response = ActivityInfoVO.class, notes =
            "lastCreateTime为上一页最后一个活动创建时间的毫秒数（若是第一页则不传）；"
                    + "返回按创建时间由新到旧的List<ActivityInfoVO>, 只返回审批通过的、尚未结束的活动")
    @GetMapping("latestList")
    public SimpleResponse latestActivities(HttpSession httpSession, @RequestParam int size,
            @RequestParam(required = false) Long lastCreateTime){
        try {
            List<ActivityInfoVO> activityInfoVOList = activityService.getLatestActivities(size,
                    lastCreateTime==null?Long.MAX_VALUE:lastCreateTime);
            return SimpleResponse.ok(activityInfoVOList);
        } catch (Exception e) {
            return SimpleResponse.exception(e);
        }
    }
}
