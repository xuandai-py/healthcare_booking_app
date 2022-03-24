export const adminMenu = [
    { // quan ly nguoi dung
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.CRUD', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.CRUD-REDUX', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin'
            },
            { // quan ly ke hoach kham benh
               
                        name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
                    
                
            }
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { // quan ly phòng khám
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            }
        ]
    },
    { // quan ly chuyên khoa
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            }
        ]
    },

    { // quan ly cẩm nang
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            }
        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [

            { // quan ly nguoi dung
               
                        name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
                    
                
            }]
    }
]