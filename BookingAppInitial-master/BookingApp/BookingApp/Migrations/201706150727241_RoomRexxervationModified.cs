namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RoomRexxervationModified : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RoomReservations", "Canceled", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.RoomReservations", "Canceled");
        }
    }
}
