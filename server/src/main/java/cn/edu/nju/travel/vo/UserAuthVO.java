package cn.edu.nju.travel.vo;

import cn.edu.nju.travel.constant.ApproveStateCode;
import cn.edu.nju.travel.entity.AuthenticationEntity;
import java.sql.Timestamp;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created on 2019/1/16
 */
@Data
@NoArgsConstructor
public class UserAuthVO {


    private int id;
    private int userId;
    private String attachmentUrl;
    private String context;

    private Long createTime;
    private Long modifyTime;
    private int state;
    @Setter
    private UserInfoVO userInfo;


    public UserAuthVO(AuthenticationEntity entity, UserInfoVO userInfo){
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.attachmentUrl = entity.getAttachmentUrl();
        this.context = entity.getContext();
        this.state = entity.getState();
        this.userInfo = userInfo;
        this.createTime = entity.getCreateTime().getTime();
        this.modifyTime = entity.getModifyTime().getTime();
    }

    public void setState(ApproveStateCode code){
        this.state = code.getIndex();
    }
}
