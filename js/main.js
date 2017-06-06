//点击注册的时候，注册的模态框显示；点击登录的时候，登录的模态框显示
//注册
$(function(){
    var btn = $('.login').find('button');
    var close = $('#close');
    console.log(close);
    btn.on('click',function(){
        $('#register').modal('show');
    });
    //一定要是模态框弹出来之后再绑定关闭事件
    $('#register').on('show.bs.modal',function(){
        close.on('click',function(){
            $('#register').modal('hide');
        });
        function Messsage(name,email,psw) {
            this.name = name;
            this.email = email;
            this.psw = psw;
        }
        var register = $('.register');
        register.on('click',function(event){
            var name1 = $('input[name="username"]').val();
            var email1 = $('input[name="email"]').val();
            var psw1 = $('input[name="psw"]').val();
            //获取一个能够打开数据库的对象
            var request = window.indexedDB.open('Regs',2);
            //更新
            request.onupgradeneeded = function (event) {
                console.log('更新成功');
                //创建表
                var db = this.result;
                //判断一下是否已经有表存在
                if (db.objectStoreNames.contains('regs')) {
                    db.deleteObjectStore('regs');
                }
                //创建
                var store = db.createObjectStore('regs', {
                    keyPath: 'id',
                    autoIncrement: true
                });
            };
            // 成功以后      保存
            request.onsuccess = function (event) {
                //db--->tran---->store
                var db = this.result;
                var tran = db.transaction(['regs'],'readwrite');
                var store = tran.objectStore('regs');
                //创建对象
                var message = new Messsage(name1,email1,psw1);
                var re = store.put(message);
            };
            //出现错误
            request.onerror = function (event) {
                console.log('出错了');
            }
        });
    });

    //特点
    //当页面一加载的时候，特点的内容就展示在页面上
    $.ajax('data/feature.json',{
        method:'get',
        success:function(data){
            show(data);
        }
    })
    function show(data){
        console.log(data);//[{},{}]
        data.forEach(function(item){
            //console.log(item);//{}相当于每一行
            //创建行
            var tr = $('<tr></tr>');
            for(var key in item){
                console.log(item[key]);//相当于一个单元格
                //创建td
                var td = $('<td>'+item[key]+'</td>');
                tr.append(td)
            }
            var tbody = $('<tbody></tbody>');
            tbody.append(tr);
            var table = $('<table></table>');
            table.append(tbody);
            table.css('font-size','12px');
            table.css('margin-left',"40px");
            $('#feature').append(table);
            $('#feature').append('<hr>')
        })
    }


});

