namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class KeysChangedInCommentAndRoomReservation : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.Comments");
            DropPrimaryKey("dbo.RoomReservations");
            AddColumn("dbo.Comments", "Id", c => c.Int(nullable: false, identity: true));
            AddColumn("dbo.RoomReservations", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.Comments", "Id");
            AddPrimaryKey("dbo.RoomReservations", "Id");
        }
        
        public override void Down()
        {
            DropPrimaryKey("dbo.RoomReservations");
            DropPrimaryKey("dbo.Comments");
            DropColumn("dbo.RoomReservations", "Id");
            DropColumn("dbo.Comments", "Id");
            AddPrimaryKey("dbo.RoomReservations", new[] { "RoomId", "UserId", "TimeStamp" });
            AddPrimaryKey("dbo.Comments", new[] { "AccommodationId", "UserId" });
        }
    }
}
