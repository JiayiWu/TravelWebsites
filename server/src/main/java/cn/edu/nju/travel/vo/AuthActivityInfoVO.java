package cn.edu.nju.travel.vo;

import cn.edu.nju.travel.constant.JoinTypeCode;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * Created by Jiayiwu on 19/1/18.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@Data
public class AuthActivityInfoVO {
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

    private String description;

}
