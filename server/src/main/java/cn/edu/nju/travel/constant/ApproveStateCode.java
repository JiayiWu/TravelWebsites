package cn.edu.nju.travel.constant;

/**
 * Created by Jiayiwu on 19/1/12.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
public enum  ApproveStateCode {

    NEW(0,"新申请审批，还未处理"),ACCEPT(1,"审批通过"),REJECT(2,"审批拒绝"),DETELE(3,"逻辑删除");

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
}
