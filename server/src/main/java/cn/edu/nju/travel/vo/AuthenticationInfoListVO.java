package cn.edu.nju.travel.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.sql.Timestamp;

/**
 * Created by Jiayiwu on 19/1/13.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@Data
public class AuthenticationInfoListVO {

    private Integer id;
    @ApiModelProperty(notes = "申请者用户信息")
    private UserInfoVO applyUserInfo;
    @ApiModelProperty(notes = "申请时间")
    private long createTime;
    @ApiModelProperty(notes = "最近一次申请活动时间")
    private long modifyTime;
    /**
     * {@link cn.edu.nju.travel.constant.ApproveStateCode}
     */
    @ApiModelProperty(notes = "该申请当前状态 0 新申请审批，还未处理 1 审批通过  2  审批拒绝")
    private Integer state;
    @ApiModelProperty(notes = "申请附件")
    private String attachmentUrl;
    @ApiModelProperty(notes = "申请文字内容")
    private String context;
}
