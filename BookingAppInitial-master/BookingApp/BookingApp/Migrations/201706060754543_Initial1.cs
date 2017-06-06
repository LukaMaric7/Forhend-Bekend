namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Rooms", "Description", c => c.String(maxLength: 1024));
            AlterColumn("dbo.Comments", "Grade", c => c.Int());
            DropColumn("dbo.Rooms", "MyProperty");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Rooms", "MyProperty", c => c.String(maxLength: 1024));
            AlterColumn("dbo.Comments", "Grade", c => c.Int(nullable: false));
            DropColumn("dbo.Rooms", "Description");
        }
    }
}
