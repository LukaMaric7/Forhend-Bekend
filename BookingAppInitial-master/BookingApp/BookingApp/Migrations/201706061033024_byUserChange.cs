namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class byUserChange : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "appUserId", c => c.Int(nullable: false));
            CreateIndex("dbo.AspNetUsers", "appUserId");
            AddForeignKey("dbo.AspNetUsers", "appUserId", "dbo.AppUsers", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUsers", "appUserId", "dbo.AppUsers");
            DropIndex("dbo.AspNetUsers", new[] { "appUserId" });
            DropColumn("dbo.AspNetUsers", "appUserId");
        }
    }
}
