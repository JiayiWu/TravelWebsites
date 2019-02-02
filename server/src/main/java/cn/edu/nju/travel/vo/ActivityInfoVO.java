package cn.edu.nju.travel.vo;

import cn.edu.nju.travel.constant.JoinTypeCode;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created by Jiayiwu on 19/1/13.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@Data
public class ActivityInfoVO {
    private Integer id;

    @ApiModelProperty(notes = "创建人信息")
    private UserInfoVO creator;

    private String title;

    private String location;
    /**
     * 活动开始时间，必填
     */
    @ApiModelProperty(notes = "活动开始时间，必填")
    private long startTime;

    /**
     * 活动结束时间,非必填
     */
    @ApiModelProperty(notes = "活动结束时间,非必填")
    private long endTime;


    /**
     * {@link JoinTypeCode}
     */
    private Integer joinType;

    private String coverUrl;

    //todo
    private Integer state;

    private String description;

    /**
     * 参与者列表
     */
    @ApiModelProperty(notes = "参与者列表")
    private List<UserInfoVO> attendList;

    @ApiModelProperty(notes = "0代表自己创建的，1代表参与的")
    private int type;
}
