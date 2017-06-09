namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AppUserChanged : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AppUsers", "Name", c => c.String(maxLength: 25));
            AddColumn("dbo.AppUsers", "LastName", c => c.String(nullable: false, maxLength: 64));
            DropColumn("dbo.AppUsers", "UserName");
            DropColumn("dbo.AppUsers", "Email");
            DropColumn("dbo.AppUsers", "Password");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AppUsers", "Password", c => c.String(nullable: false));
            AddColumn("dbo.AppUsers", "Email", c => c.String(nullable: false, maxLength: 64));
            AddColumn("dbo.AppUsers", "UserName", c => c.String(maxLength: 25));
            DropColumn("dbo.AppUsers", "LastName");
            DropColumn("dbo.AppUsers", "Name");
        }
    }
}
