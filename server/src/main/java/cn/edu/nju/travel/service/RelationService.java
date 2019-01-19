package cn.edu.nju.travel.service;

import cn.edu.nju.travel.entity.RelationEntity;
import cn.edu.nju.travel.vo.AuthenticationInfoListVO;

import java.util.List;

/**
 * Created by yuhqqq on 2019/1/16.
 */
public interface RelationService {

    /**
     * 根据活动id查找所有报名参加活动的人
     * 报名是否需要审核以及是否通过审核由调用者进行处理
     * @param activityId
     * @return
     */
    List<RelationEntity> findAllRelationByActivityId(Integer activityId) throws Exception;

    /**
     * 根据用户id查找此用户报名的所有活动
     * 包括审核未通过的、待审核的等
     * @param userId
     * @return
     */
    List<RelationEntity> findAllRelationByUserID(Integer userId) throws Exception;

    /**
     * 用户申请参加活动
     * 如果活动无需验证，则直接通过，生成state通过的relation
     * 如果需要验证，则生成state不通过的relation和待验证的Audit
     * @param activityId
     * @param userId
     * @param attachmentUrl
     * @param context
     * @return
     * @throws Exception
     */
    int attendActivity(Integer activityId, Integer userId, String attachmentUrl, String context) throws Exception;

    int quitActivity(Integer activityId, Integer user) throws Exception;

    int auditAttendActivity(Integer activityId, Integer userId, Integer result) throws Exception;

    List<AuthenticationInfoListVO> getAuditInfoList(Integer creatorId, Integer state) throws Exception;


}
