package cn.edu.nju.travel.constant;

import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.utils.ServerException;

/**
 * Created by Jiayiwu on 19/1/12.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
public enum  ApproveStateCode {

    NO_APPLY(-1, "未提交认证"), NEW(0,"新申请审批，还未处理"),ACCEPT(1,"审批通过"),REJECT(2,"审批拒绝"),DETELE(3,"逻辑删除");

    private final String value;
    private final int index;

    ApproveStateCode(int index, String value){
        this.index = index;
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public int getIndex() {
        return index;
    }

    public static ApproveStateCode getStateByIndex(int index){
        switch (index){
            case 0:
                return NEW;
            case 1:
                return ACCEPT;
            case 2:
                return REJECT;
            case 3:
                return DETELE;
            default:
                throw new ServerException(ResponseCode.Error,"系统无此审批状态: "+index);
        }
    }
}
